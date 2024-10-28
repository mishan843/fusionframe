import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addUser, Updateuser } from 'services/UsersService';
import { useEffect } from 'react';
import { getRoles } from 'services/RoleService';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import FormTextField from 'views/commoncomponent/FormTextField';
import SelectFiels from 'views/commoncomponent/SelectFiels';

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

const validationSchemas = {
    add: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string().required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        user_type: Yup.string().required('User type is required'),
        designation: Yup.string().required('Designation is required'),
    }),
    edit: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        user_type: Yup.string().required('User type is required'),
        designation: Yup.string().required('Designation is required'),
    }),
};

export default function AddUsers({ open, setOpen, getUserData, userDetails, getUserDetails, setLoading }) {
    const [roleData, setRoleData] = useState([]);
    const [locationRoleData, setLocationRoleData] = useState([]);
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setSubmitAttempted(false)
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            user_type: '',
            userLocation: '',
            designation: '',
            role: null
        },
        validationSchema: userDetails ? validationSchemas.edit : validationSchemas.add,
        onSubmit: async (values) => {
            try {
                const newValues = {
                    ...values,
                    created_by: userId,
                };
                setLoading(true)
                if (userDetails) {
                    await Updateuser(newValues, userDetails._id);
                    getUserDetails();
                } else {
                    await addUser(newValues);
                    getUserData();
                }
                handleClose();
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }

    });

    useEffect(() => {
        if (userDetails) {
            formik.setValues({
                name: userDetails?.name || '',
                email: userDetails?.email || '',
                password: userDetails?.password || '',
                user_type: userDetails?.user_type || '',
                userLocation: userDetails?.userLocation || '',
                designation: userDetails?.designation || ''
            });
        }
    }, [userDetails, open]);

    const getRoleData = async () => {
        try {
            const params = {
                search: '',
                skip: 0,
                limit: 0,
                isDefault: formik.values.user_type === 'custom' ? false : true
            };
            const response = await getRoles(params);
            if (formik.values.user_type === 'custom') {
                setLocationRoleData(response?.roles);
            } else {
                setRoleData(response?.roles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRoleData();
    }, [formik.values.user_type]);

    const options = [
        { label: "Custom Role", value: "custom" },
        ...roleData.map((item) => ({
            label: item?.name,
            value: item?.name,
        })),
    ];

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                            {userDetails && 'Edit User'}
                            {!userDetails && 'Add User'}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ padding: '5px', height: 'fit-content' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitAttempted(true); formik.handleSubmit(e); }}>
                        <FormTextField
                            id="name"
                            label="Name"
                            name="name"
                            value={formik.values.name || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.name && Boolean(formik.errors.name)}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                        />
                        <FormTextField
                            id="email"
                            label="Email"
                            name="email"
                            value={formik.values.email || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.email && Boolean(formik.errors.email)}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                        />

                        {!userDetails &&
                            <>
                                <FormTextField
                                    id="password"
                                    label="Password"
                                    name="password"
                                    value={formik.values.password || ''}
                                    onChange={formik.handleChange}
                                    showError={submitAttempted && formik.touched.password && Boolean(formik.errors.password)}
                                    error={Boolean(formik.errors.password)}
                                    helperText={formik.errors.password}
                                    type='password'
                                />
                                <FormTextField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword || ''}
                                    onChange={formik.handleChange}
                                    showError={submitAttempted && Boolean(formik.errors.confirmPassword)}
                                    error={Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.errors.confirmPassword}
                                    type='password'
                                />
                            </>
                        }
                        <SelectFiels
                            field={{ name: 'user_type', label: ' User type' }}
                            formik={formik}
                            options={options}
                            handleChange={(event) => {
                                if (event.target.value !== 'custom') {
                                    const selectedRole = roleData.find(item => item.name === event.target.value);
                                    formik.setFieldValue('user_type', selectedRole.name);
                                    formik.setFieldValue('role', selectedRole._id);
                                }
                                else {
                                    formik.setFieldValue('user_type', event.target.value);
                                }
                            }}
                            error={Boolean(formik.errors.user_type)}
                        />

                        {formik.values.user_type === 'custom' && (
                            <SelectFiels
                                field={{ name: 'userLocation', label: 'Location role' }}
                                formik={formik}
                                options={locationRoleData.map((item) => ({
                                    label: item?.name,
                                    value: item?.name,
                                }))}
                                handleChange={(event) => {
                                    const selectedRole = locationRoleData.find(item => item.name === event.target.value);
                                    formik.setFieldValue('userLocation', selectedRole.name);
                                    formik.setFieldValue('role', selectedRole._id);
                                }}
                            />
                        )}
                        <FormTextField
                            id="designation"
                            label="Designation"
                            name="designation"
                            value={formik.values.designation || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.designation && Boolean(formik.errors.designation)}
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
                            <Button variant="contained" type="submit">
                                Save
                            </Button>
                            <Button variant="contained" sx={{ ml: 2 }} onClick={handleClose}>
                                Close
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}