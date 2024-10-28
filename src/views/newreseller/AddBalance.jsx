import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
    balance: Yup.number()
        .required('Balance is required')
        .positive('Balance must be a positive number')
        .integer('Balance must be an integer'),
});

export default function AddBalance({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
    };

    const formik = useFormik({
        initialValues: {
            balance: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                handleClose();
            } catch (error) {
                setErrors({ api: 'Failed to add balance' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                        Add Balance
                    </Typography>
                    <Typography fontSize={'14px'} textAlign={'end'} mt={3}>
                        Total Balance: 1500
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            id="balance"
                            label="Balance"
                            variant="outlined"
                            fullWidth
                            name="balance"
                            margin="normal"
                            size="small"
                            type="number"
                            value={formik.values.balance}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.balance && Boolean(formik.errors.balance)}
                            helperText={formik.touched.balance && formik.errors.balance}
                        />
                        {formik.errors.api && (
                            <Typography color="error" variant="body2">
                                {formik.errors.api}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 2,
                            }}
                        >
                            <Button variant="contained" onClick={handleClose}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ ml: 2 }}
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}