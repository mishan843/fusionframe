import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IconButton } from '@mui/material';
import { getPackageS } from 'services/PackageService';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';
import FormTextField from 'views/commoncomponent/FormTextField';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import moment from 'moment';
import { addInventory, UpdateInventory } from 'services/InventoryService';
import { getUser } from 'services/UsersService';

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
    plan: Yup.string().required('Plan is required'),
    user: Yup.string().required('User is required'),
    deviceType: Yup.string().required('Select one device type'),
    serialNo: Yup.string().required('Serial no is required'),
    model: Yup.string().required('Model is required'),
    deviceInstallationDate: Yup.string().required('Select Installation date'),
    warranty: Yup.string().required('Warranty is required'),
});


export default function AddInventory({
    open,
    setOpen,
    getPackageData,
    getPackageDetails,
    packageDetail,
    inventoryDetail,
    mode,
    setMode
}) {
    
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const [loading, setLoading] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [packageData, setPackageData] = useState([])
    const [userData, setUserData] = useState([])

    const getPlanData = async () => {
        try {
            setLoading(true);
            const response = await getPackageS();
            setLoading(false);

            const options = response?.packages?.map((pkg) => ({
                label: pkg.name,
                value: pkg._id,
            }));

            setPackageData(options);
        } catch (error) {
            console.error(error);
        }
    };

    const getUserData = async () => {
        const userdata = localStorage.getItem('userdata')
        const userId = JSON.parse(userdata)?._id
        try {
            const params = {
                search: ``,
                sort: ``,
                skip: ``,
                limit: ``,
                created_by: `${userId}`,
            };
            setLoading(true);
            const response = await getUser(params);
            setLoading(false);

            const options = response?.users?.map((pkg) => ({
                label: pkg.name,
                value: pkg._id,
            }));

            setUserData(options);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getPlanData()
        getUserData()
    }, [])

    const formik = useFormik({
        initialValues: {
            deviceType: inventoryDetail?.deviceType,
            plan: inventoryDetail?.plan || "",
            user: inventoryDetail?.user || "",
            serialNo: inventoryDetail?.serialNo || "",
            model: inventoryDetail?.model || "",
            deviceInstallationDate: inventoryDetail?.deviceInstallationDate || moment().format('YYYY-MM-DD'),
            warranty: inventoryDetail?.warranty || "",
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
                    await addInventory(data);
                    getPackageData();
                    setOpen(false)
                    setMode('')
                    formik.resetForm();
                } else if (mode === 'edit') {
                    await UpdateInventory(data, inventoryDetail._id);
                    getPackageDetails();
                    setOpen(false)
                    setMode('')
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
        setMode('')
        setOpen(false);
        formik.resetForm();
        setSubmitAttempted(false);
    };

    useEffect(() => {
        if (inventoryDetail && mode === 'edit') {
            formik.setValues({
                plan: inventoryDetail?.planDetail?.planId                ,
                user: inventoryDetail?.userDetail?.userId || "",
                deviceType: inventoryDetail?.deviceType,
                serialNo: inventoryDetail?.serialNo,
                model: inventoryDetail?.model,
                deviceInstallationDate: inventoryDetail?.deviceInstallationDate,
                warranty: inventoryDetail?.warranty,
            });
        }
    }, [inventoryDetail, open, mode]);

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
                            {packageDetail && 'Edit Inventory'}
                            {!packageDetail && 'Create Inventory'}
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
                        <SelectFiels
                            field={{ name: 'plan', label: 'Plan' }}
                            formik={formik}
                            options={[
                                ...packageData
                            ]}
                            value={formik.values?.plan?.planId ? formik.values.plan?.planId : ''}
                            handleChange={formik.handleChange}
                        />
                        <SelectFiels
                            field={{ name: 'user', label: 'User' }}
                            formik={formik}
                            options={[
                                ...userData
                            ]}
                            value={formik.values.user.userId ? formik.values.user.userId : ''}
                            handleChange={formik.handleChange}
                        />
                        <SelectFiels
                            field={{ name: 'deviceType', label: 'Device Type' }}
                            formik={formik}
                            options={[
                                { label: "Select", value: "" },
                                { label: "ONT", value: "ONT" },
                                { label: "Router", value: "Router" },
                                { label: "Switch", value: "Switch" },
                                { label: "ONU", value: "ONU" },
                            ]}
                            handleChange={formik.handleChange}
                        />
                        <FormTextField
                            id="model"
                            label="Model"
                            name="model"
                            value={formik.values.model || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.model && Boolean(formik.errors.model)}
                            error={Boolean(formik.errors.model)}
                            helperText={formik.errors.model}
                        />
                        <FormTextField
                            id="serialNo"
                            label="Serial No"
                            name="serialNo"
                            value={formik.values.serialNo || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.serialNo && Boolean(formik.errors.serialNo)}
                            error={Boolean(formik.errors.serialNo)}
                            helperText={formik.errors.serialNo}
                        />
                        <FormTextField
                            id="deviceInstallationDate"
                            label="Installation Date"
                            name="deviceInstallationDate"
                            value={
                                formik.values.deviceInstallationDate
                                    ? moment(formik.values.deviceInstallationDate).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD') // Set the current date if no value is present
                            }
                            onChange={formik.handleChange}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormTextField
                            id="warranty"
                            label="Warranty"
                            name="warranty"
                            value={formik.values.warranty || ''}
                            onChange={formik.handleChange}
                            showError={submitAttempted && formik.touched.warranty && Boolean(formik.errors.warranty)}
                            error={Boolean(formik.errors.warranty)}
                            helperText={formik.errors.warranty}
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