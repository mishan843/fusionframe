import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import FormTextField from 'views/commoncomponent/FormTextField';
import { Checkbox } from '@mui/material';
import { addTicketCategory, UpdateTicketCategory } from 'services/TicketCategoryService';

const AddTicketCategory = ({ open, setOpen, getTicketData, setLoading, categoryDetail }) => {
  const userdata = localStorage.getItem('userdata');
  const userId = JSON.parse(userdata)?._id;

  // Determine if we are editing or creating a new category
  const isEditMode = Boolean(categoryDetail);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    status: Yup.string().required('Status is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: categoryDetail?.name || '',
      status: categoryDetail?.status || 'Active',
      forReseller: categoryDetail?.forReseller || false,
      forLco: categoryDetail?.forLco || false,
      forEmployee: categoryDetail?.forEmployee || false,
    },
    enableReinitialize: true,  // Important to reinitialize form values when `categoryDetail` changes
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const data = {
          ...values,
          created_by: userId
        };

        if (isEditMode) {
          // Update existing category
          await UpdateTicketCategory(categoryDetail?._id, data);
        } else {
          // Create new category
          await addTicketCategory(data);
        }

        handleClose();
        getTicketData();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Close modal and reset form
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" fontSize={'1.5rem'}>
          {isEditMode ? 'Edit Category' : 'Create New Category'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormTextField
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            showError={formik.touched.name && Boolean(formik.errors.name)}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />

          <SelectFiels
            field={{ name: 'status', label: 'Status' }}
            formik={formik}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]}
            value={formik.values.status}
            handleChange={formik.handleChange}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="forReseller" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Checkbox
                  id="forReseller"
                  size="small"
                  checked={formik.values.forReseller}
                  onChange={(event) => formik.setFieldValue('forReseller', event.target.checked)}
                />
                <Typography variant="body2">For Reseller</Typography>
              </label>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="forLco" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Checkbox
                  id="forLco"
                  size="small"
                  checked={formik.values.forLco}
                  onChange={(event) => formik.setFieldValue('forLco', event.target.checked)}
                />
                <Typography variant="body2">For LCO</Typography>
              </label>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="forEmployee" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Checkbox
                  id="forEmployee"
                  size="small"
                  checked={formik.values.forEmployee}
                  onChange={(event) => formik.setFieldValue('forEmployee', event.target.checked)}
                />
                <Typography variant="body2">For Employee</Typography>
              </label>
            </Box>

          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} type="submit">
              {isEditMode ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTicketCategory;
