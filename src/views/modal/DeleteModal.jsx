import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Divider } from '@mui/material';

const DeleteModal = ({ open, handleClose, message, handleOnDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <DialogTitle id="delete-confirmation-dialog-title">
        <Typography variant="h4" component="span">Delete Confirmation</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="delete-confirmation-dialog-description" sx={{ fontSize: '16px' }}>
        Are you sure you want to delete this {message}?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '12px' }}>
        <Button variant='contained' size='small' onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant='contained' size='small' onClick={handleOnDelete} sx={{backgroundColor:'#E71D36'}}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;