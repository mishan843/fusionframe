import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addRole } from 'services/RoleService';
import FormTextField from 'views/commoncomponent/FormTextField';

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
    designation: Yup.string().required('Designation is required'),
});

export default function AddRole({ open, setOpen, getRoleData, setLoading }) {
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            designation: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const data = {
                    ...values,
                    created_by: userId
                }
                await addRole(data);
                handleClose()
                getRoleData()
                setLoading(false)
            } catch (error) {
                console.error(error);
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
                        Add Role
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <FormTextField
                            id="name"
                            label="Name"
                            name="name"
                            value={formik.values.name || ''}
                            onChange={formik.handleChange}
                            showError={formik.touched.name && Boolean(formik.errors.name)}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                        />
                        <FormTextField
                            id="designation"
                            label="Designation"
                            designation="designation"
                            value={formik.values.designation || ''}
                            onChange={formik.handleChange}
                            showError={formik.touched.designation && Boolean(formik.errors.designation)}
                            error={Boolean(formik.errors.designation)}
                            helperText={formik.errors.designation}
                        />
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
                            <Button variant="contained" sx={{ ml: 2 }} type="submit">
                                Create
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}