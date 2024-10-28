import { Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getUserDetail, Updateuser } from 'services/UsersService';
import backgroundImage from '../../assets/images/profilebackground.jpg';
import CircleLoader from 'ui-component/cards/CircleLoader';

const MAX_FILE_SIZE_MB = 5;

const About = ({ edit, setEdit }) => {
  const userData = JSON.parse(localStorage.getItem('userdata'));
  const [selectedImage, setSelectedImage] = useState(userData?.profile_background?.url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ name: '', size: '' });
  const [errors, setErrors] = useState({ image: '' });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];

      if (!allowedFileTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: 'Please upload a valid image file type (JPEG, PNG, GIF, BMP, WEBP).'
        }));
        return;
      }

      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: `File size exceeds ${MAX_FILE_SIZE_MB} MB.`
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setFileInfo({ name: file.name, size: fileSizeMB.toFixed(2) });
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);

      setErrors((prevErrors) => ({
        ...prevErrors,
        image: ''
      }));
    }
  };

  const handleOnSave = async () => {
    if (!selectedFile) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: 'Please select an image to upload.'
      }));
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profile_background', selectedFile);
      setLoading(true);
      const response = await Updateuser(formData, userData?._id);
      if (!response.error) {
        getUserBackGroungImage();
        setEdit(false);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const getUserBackGroungImage = async () => {
    try {
      const params = {
        id: userData?._id
      };
      setLoading(true);
      const response = await getUserDetail(params);
      setSelectedImage(response?.data?.profile_background?.url);
      const updatedData = JSON.stringify(response?.data);
      // Save the updated data
      localStorage.setItem('userdata', updatedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && <CircleLoader />}
      {!edit && (
        <Card sx={{ maxWidth: 345, boxShadow: 4 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={userData?.profile_background?.url ? userData?.profile_background?.url : backgroundImage} alt="profile background" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                profilebackground.jpg
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      {edit && (
        <Box>
          <input accept="image/*" style={{ display: 'none' }} id="image-upload" type="file" onChange={handleImageChange} />
          <label htmlFor="image-upload" className="d-flex justify-content-between align-items-center">
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Typography>Upload Background Image:</Typography>
              <IconButton component="span">
                <CloudUploadIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Button variant="contained" onClick={handleOnSave}>
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setEdit(false);
                  setErrors('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </label>
          {errors.image && <Typography color="error">{errors.image}</Typography>}
          {selectedImage && (
            <Card sx={{ maxWidth: 345, mt: 2, boxShadow: 4 }}>
              <CardMedia component="img" height="300" image={selectedImage} alt={fileInfo.name} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {fileInfo.name} ({fileInfo.size} MB)
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </>
  );
};

export default About;
