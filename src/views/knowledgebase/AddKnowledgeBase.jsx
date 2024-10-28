import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormTextField from 'views/commoncomponent/FormTextField';
import { addKnowledgeBase, UpdateKnowledgeBase } from 'services/KnowledgeBaseService';
import { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CircleLoader from 'ui-component/cards/CircleLoader';

const AddKnowledgeBase = ({ open, getKnowledgeBaseData, handleClose, knowledgeData, getKnowledgeData }) => {
  const userdata = localStorage.getItem('userdata');
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(userdata)?._id;

  const isEditMode = Boolean(knowledgeData);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subTitle: Yup.string().required('Sub Title is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().test(
      'description-required',
      'Description is required',
      (value) => {
        const strippedValue = value?.replace(/<(.|\n)*?>/g, '').trim();
        return !!strippedValue;
      }
    ),
  });

  const base64ToBlob = (base64, type) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type });
  };

  const formik = useFormik({
    initialValues: {
      title: knowledgeData?.title || '',
      subTitle: knowledgeData?.subTitle || '',
      category: knowledgeData?.category || '',
      description: knowledgeData?.description || '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setFieldTouched('description', true);
      await formik.validateForm();

      if (!formik.isValid) {
        return;
      }

      try {
        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('subTitle', values.subTitle);
        formData.append('category', values.category);
        formData.append('created_by', userId);

        // Extract base64 images from the description
        const base64Images = [];
        const regex = /<img[^>]+src="([^">]+)"/g;
        let match;

        // Find base64 images in the description
        while ((match = regex.exec(values.description))) {
          const imgSrc = match[1];
          if (imgSrc.startsWith('data:')) {
            base64Images.push(imgSrc);
          }
        }

        // Append base64 images to formData
        base64Images.forEach((base64String, index) => {
          const mimeType = base64String.split(';')[0].split(':')[1]; // Extract the MIME type
          const blob = base64ToBlob(base64String.split(',')[1], mimeType); // Convert Base64 string to Blob
          formData.append('images', blob, `base64Image${index}.png`); // Add blob to formData
        });

        console.log(base64Images, 'Base64 Images'); // Log the base64 images

        // Optionally, if you still need to keep existing images, you could do that here:
        // const existingImageIds = knowledgeData?.images.map(img => img.public_id) || [];
        // existingImageIds.forEach(publicId => {
        //   formData.append('existing_images[]', publicId); // Append existing image IDs
        // });

        if (isEditMode) {
          const response = await UpdateKnowledgeBase(formData, knowledgeData._id);
          if (response.message === "Knowledge updated successfully") {
            handleClose(); // Close modal after success
            getKnowledgeData(); // Refresh data after updating
          }
        } else {
          const response = await addKnowledgeBase(formData);
          if (response.message === "Knowledge created successfully!") {
            handleClose(); // Close modal after success
            getKnowledgeBaseData(); // Refresh data after creation
          }
        }
      } catch (error) {
        console.error(error); // Handle error properly
      } finally {
        setLoading(false); // Always stop loading when finished
        formik.resetForm(); // Reset form after submission
      }
    },
  });

  return (
    <>
      {loading && <CircleLoader />} {/* Show loader when loading */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" fontSize={'1.5rem'}>
            {isEditMode ? 'Edit Article' : 'Create New Article'}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <FormTextField
                id="title"
                label="Title"
                name="title"
                value={formik.values.title || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                showError={formik.touched.title && Boolean(formik.errors.title)}
                error={Boolean(formik.errors.title)}
                helperText={formik.errors.title}
              />
              <FormTextField
                id="subTitle"
                label="SubTitle"
                name="subTitle"
                value={formik.values.subTitle || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                showError={formik.touched.subTitle && Boolean(formik.errors.subTitle)}
                error={Boolean(formik.errors.subTitle)}
                helperText={formik.errors.subTitle}
              />

              {/* MUI Select for Category */}
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Cloud">Cloud</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="VPS">VPS</MenuItem>
                  {/* Add more categories as needed */}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <Typography color="error" variant="caption">
                    {formik.errors.category}
                  </Typography>
                )}
              </FormControl>

              <ReactQuill
                name={'description'}
                value={formik.values.description}
                onChange={(content) => formik.setFieldValue('description', content)}
                onBlur={() => formik.setFieldTouched('description', true)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ script: 'sub' }, { script: 'super' }],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['blockquote', 'code-block'],
                    [{ align: [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'size',
                  'bold', 'italic', 'underline', 'strike',
                  'color', 'background',
                  'script',
                  'list', 'bullet', 'indent',
                  'blockquote', 'code-block',
                  'align',
                  'link', 'image', 'video',
                ]}
                theme="snow"
                style={{ height: '100%' }}
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger mt-2">{formik.errors.description}</div>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={() => handleClose()}>
                Close
              </Button>
              <Button variant="contained" sx={{ ml: 2 }} type="submit" disabled={loading}>
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddKnowledgeBase;
