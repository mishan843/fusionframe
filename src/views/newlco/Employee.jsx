import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { addLCOEMP, UpdateLCOEMP } from 'services/LCOService';
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

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Invalid email address'),
    password: Yup.string()
        .required('Password is required'),
    userName: Yup.string().required('User Name No is required'),
});

export default function Employee({ open, setOpen, mode, getEmployeeData, employee, setEmployee, lcoID }) {
    const userdata = localStorage.getItem('userdata')
    const Id = JSON.parse(userdata)?._id
    const { userId } = useParams()
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEmployee([]);
    };

    const formik = useFormik({
        initialValues: {
            name: employee?.name || '',
            email: employee?.email || '',
            password: employee?.password || '',
            role: employee?.role || 'Admin',
            userName: employee?.userName || '',
            mobile: employee?.mobile || '',
            status: employee?.status || 'active'
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let data;

                if (mode === 'add') {
                    data = {
                        employeeData: {
                            ...values,
                            created_by: Id
                        },
                        lcoId: userId ? userId : lcoID
                    }
                    await addLCOEMP(data);
                } else if (mode === 'edit') {
                    data = {
                        updates: {
                            ...values,
                            created_by: Id
                        },
                        lcoId: userId ? userId : lcoID,
                        employeeId: employee?._id
                    }
                    await UpdateLCOEMP(data);
                }
                setOpen(false)
                getEmployeeData()
                formik.resetForm();
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (employee) {
            formik.setValues({
                name: employee?.name,
                email: employee?.email,
                password: employee?.password,
                role: employee?.role || 'Admin',
                userName: employee?.userName,
                mobile: employee?.mobile,
                status: employee?.status || 'active'
            });
        }
    }, [employee, open]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitAttempted(true);
        await formik.submitForm();
        setEmployee([])
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                        {mode === 'add' ? ' Add Employee' : ' Edit Employee'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
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
                            id="userName"
                            label="User Name"
                            name="userName"
                            value={formik.values.userName || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.userName && Boolean(formik.errors.userName)}
                            error={Boolean(formik.errors.userName)}
                            helperText={formik.errors.userName}
                        />
                        <FormTextField
                            id="email"
                            label="Email"
                            name="email"
                            value={formik.values.email || ''}
                            onChange={formik.handleChange}
                        />
                        <SelectFiels
                            field={{ name: 'role', label: 'Role' }}
                            formik={formik}
                            options={[
                                { label: 'Admin', value: 'Admin' },
                                { label: 'Manager', value: 'Manager' },
                                { label: 'Oprator', value: 'Oprator' },
                                { label: 'Accounts', value: 'Accounts' },
                            ]}
                            handleChange={formik.handleChange}
                        />
                        <FormTextField
                            id="password"
                            label="Password"
                            name="password"
                            value={formik.values.password || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.password && Boolean(formik.errors.password)}
                            error={Boolean(formik.errors.password)}
                            helperText={formik.errors.password}
                        />
                        <SelectFiels
                            field={{ name: 'status', label: 'Status' }}
                            formik={formik}
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'InActive', value: 'inactive' },
                            ]}
                            handleChange={formik.handleChange}
                        />
                        <FormTextField
                            id="mobile"
                            label="Mobile No"
                            name="mobile"
                            value={formik.values.mobile || ''}
                            onChange={formik.handleChange}
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
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}