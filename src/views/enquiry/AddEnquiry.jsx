import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IconButton } from '@mui/material';
import { addPackage, UpdatePackage } from 'services/PackageService';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';
import FormTextField from 'views/commoncomponent/FormTextField';
import { addEnquiry, UpdateEnquiry } from 'services/EnquiryService';

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

const timeOptions = ['Hour/s', 'Day/s', 'Week/s', 'Month/s', 'Year/s'];
const packageTypes = ['Commercial', 'Residential', 'Fiber', 'Wireless', 'Primium I', 'Primium II'];

const validationSchema = Yup.object().shape({
    personName: Yup.string().required('Name is required'),
    companyName: Yup.string().required('Company name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Mobile no is required'),
    gstNo: Yup.string().required('Gst no is required'),
    message: Yup.string().required('Message is required'),
});


export default function AddEnquiry({
    open,
    setOpen,
    getPackageData,
    getPackageDetails,
    packageDetail,
    mode,
}) {
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const [loading, setLoading] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const formik = useFormik({
        initialValues: {
            companyName: packageDetail?.companyName,
            personName: packageDetail?.personName || "",
            email: packageDetail?.email || "",
            phone: packageDetail?.phone || "",
            gstNo: packageDetail?.gstNo,
            message: packageDetail?.message || "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    created_by: userId,
                };
                setLoading(true)
                if (mode === 'add') {
                    await addEnquiry(data);
                    getPackageData();
                    setOpen(false)
                    formik.resetForm();
                } else if (mode === 'edit') {
                    await UpdateEnquiry(data, packageDetail._id);
                    getPackageDetails();
                    setOpen(false)
                    formik.resetForm();
                }
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        },
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitAttempted(true);
        await formik.submitForm();
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setSubmitAttempted(false);
    };

    useEffect(() => {
        if (packageDetail) {
            formik.setValues({
                companyName: packageDetail?.companyName,
                personName: packageDetail?.personName,
                email: packageDetail?.email,
                phone: packageDetail?.mobileNo,
                gstNo: packageDetail?.gstNo,
                message: packageDetail?.message,
            });
        }
    }, [packageDetail, open]);

    return (
        <div>
            {loading && <CircleLoader />}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                            {packageDetail && 'Edit Enquiry'}
                            {!packageDetail && 'Create Enquiry'}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ padding: '5px', height: 'fit-content' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <FormTextField
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            value={formik.values.companyName || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.companyName && Boolean(formik.errors.companyName)}
                            error={Boolean(formik.errors.companyName)}
                            helperText={formik.errors.companyName}
                        />
                        <FormTextField
                            id="personName"
                            label="Name"
                            name="personName"
                            value={formik.values.personName || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.personName && Boolean(formik.errors.personName)}
                            error={Boolean(formik.errors.personName)}
                            helperText={formik.errors.personName}
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
                        <FormTextField
                            id="phone"
                            label="Mobile No"
                            name="phone"
                            value={formik.values.phone || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.phone && Boolean(formik.errors.phone)}
                            error={Boolean(formik.errors.phone)}
                            helperText={formik.errors.phone}
                        />
                        <FormTextField
                            id="gstNo"
                            label="GST No"
                            name="gstNo"
                            value={formik.values.gstNo || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.gstNo && Boolean(formik.errors.gstNo)}
                            error={Boolean(formik.errors.gstNo)}
                            helperText={formik.errors.gstNo}
                        />
                        <FormTextField
                            id="message"
                            label="Message"
                            name="message"
                            value={formik.values.message || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.message && Boolean(formik.errors.message)}
                            error={Boolean(formik.errors.message)}
                            helperText={formik.errors.message}
                        />
                        <Box display={'flex'} gap={2} mt={2} justifyContent={'end'} >
                            <Button variant="contained" sx={{ width: '100px' }} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" sx={{ width: '100px' }}>
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}