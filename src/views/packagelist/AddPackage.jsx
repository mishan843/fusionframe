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
import { FormControlLabel, Grid, IconButton, InputAdornment, Switch } from '@mui/material';
import { addPackage, UpdatePackage } from 'services/PackageService';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';
import FormTextField from 'views/commoncomponent/FormTextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};

const timeOptions = ['Hour/s', 'Day/s', 'Week/s', 'Month/s', 'Year/s'];
const packageTypes = ['Commercial', 'Residential', 'Fiber', 'Wireless', 'Primium I', 'Primium II'];

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    validFor: Yup.string().required('Valid For is required'),
    bandWidth: Yup.date().required('Band Width(Upload) is required'),
    bandWidthDownload: Yup.string().required('Band Width(Download) is required'),
    advertisementInternal: Yup.string().test('isHotspot', 'Advertisement Internal is required', function (value) {
        if (this.parent.isHotspot) {
            return !!value;
        }
        return true;
    }),
    advertisementUrl: Yup.string().test('isHotspot', 'Advertisement URL is required', function (value) {
        if (this.parent.isHotspot) {
            return !!value;
        }
        return true;
    }),
});


export default function AddPackage({
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
            name: packageDetail?.name || "",
            package_type: packageDetail?.package_type || "",
            description: packageDetail?.description || "",
            price: packageDetail?.price || "",
            validFor: packageDetail?.validFor || "",
            validForTime: packageDetail?.validForTime || "Hour/s",
            bandWidth: packageDetail?.bandWidth || "",
            bandWidthDownload: packageDetail?.bandWidthDownload || "",
            bandWidthSpeed: packageDetail?.bandWidthSpeed || "Mbps",
            bandWidthDownloadSpeed: packageDetail?.bandWidthDownloadSpeed || "Mbps",
            priceAfterTax: packageDetail?.price || "",
            advertisementInternal: packageDetail?.advertisementInternal || "",
            advertisementUrl: packageDetail?.onlinePayment || "",
            onlinePayment: packageDetail?.onlinePayment || false,
            ipPoolName: packageDetail?.ipPoolName || "",
            fupIpPoolName: packageDetail?.fupIpPoolName || "",
            isChargeTax: packageDetail?.isChargeTax || true,
            isHotspot: packageDetail?.isHotspot || false,
            isBindPool: packageDetail?.isBindPool || false,
            isRoundAppplicable: packageDetail?.isRoundAppplicable || false
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    created_by: userId,
                    priceAfterTax: values.isChargeTax ? '' : values.priceAfterTax,
                    isRoundAppplicable: values.isChargeTax ? false : values.isRoundAppplicable,
                    advertisementInternal: values.isHotspot ? values.advertisementInternal : '',
                    advertisementUrl: values.isHotspot ? values.advertisementUrl : '',
                    ipPoolName: values.isBindPool ? values.ipPoolName : '',
                    fupIpPoolName: values.isBindPool ? values.fupIpPoolName : '',
                };
                setLoading(true)
                if (mode === 'add') {
                    await addPackage(data);
                    getPackageData();
                    setOpen(false)
                    formik.resetForm();
                } else if (mode === 'edit') {
                    await UpdatePackage(data, packageDetail._id);
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
                name: packageDetail?.name,
                package_type: packageDetail?.package_type,
                description: packageDetail?.description,
                price: packageDetail?.price,
                validFor: packageDetail?.validFor,
                validForTime: packageDetail?.validForTime,
                bandWidth: packageDetail?.bandWidth,
                bandWidthDownload: packageDetail?.bandWidthDownload,
                bandWidthSpeed: packageDetail?.bandWidthSpeed,
                bandWidthDownloadSpeed: packageDetail?.bandWidthDownloadSpeed,
                priceAfterTax: packageDetail?.priceAfterTax,
                advertisementInternal: packageDetail?.advertisementInternal,
                advertisementUrl: packageDetail?.advertisementUrl,
                onlinePayment: packageDetail?.onlinePayment || false,
                ipPoolName: packageDetail?.ipPoolName,
                fupIpPoolName: packageDetail?.fupIpPoolName,
                isChargeTax: packageDetail?.isChargeTax,
                isHotspot: packageDetail?.isHotspot,
                isBindPool: packageDetail?.isBindPool,
                isRoundAppplicable: packageDetail?.isRoundAppplicable || false
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
                            {packageDetail && 'Edit Package'}
                            {!packageDetail && 'Create Package'}
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
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
                                <Box display={'flex'}>
                                    <FormTextField
                                        id="validFor"
                                        label="Valid for"
                                        name="validFor"
                                        value={formik.values.validFor || ''}
                                        onChange={formik.handleChange}
                                        showError={submitAttempted && formik.touched.validFor && Boolean(formik.errors.validFor)}
                                        error={Boolean(formik.errors.validFor)}
                                        helperText={formik.errors.validFor}
                                    />
                                    <FormControl fullWidth margin="normal">
                                        <Select
                                            id="validForTime"
                                            value={formik.values.validForTime}
                                            onChange={formik.handleChange}
                                            size="small"
                                            name='validForTime'
                                        >
                                            {timeOptions.map((option, index) => (
                                                <MenuItem key={index} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box display={'flex'}>
                                    <FormTextField
                                        id="bandWidth"
                                        label="Bandwidth (Upload)"
                                        name="bandWidth"
                                        value={formik.values.bandWidth || ''}
                                        onChange={formik.handleChange}
                                        showError={submitAttempted && formik.touched.bandWidth && Boolean(formik.errors.bandWidth)}
                                        error={Boolean(formik.errors.bandWidth)}
                                        helperText={formik.errors.bandWidth}
                                    />
                                    <FormControl fullWidth margin="normal">
                                        <Select
                                            id="bandWidthSpeed"
                                            value={formik.values.bandWidthSpeed}
                                            onChange={formik.handleChange}
                                            size="small"
                                            name='bandWidthSpeed'
                                        >
                                            <MenuItem value={'Mbps'}>Mbps</MenuItem>
                                            <MenuItem value={'Kbps'}>Kbps</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box display={'flex'}>
                                    <FormTextField
                                        id="bandWidthDownload"
                                        label="Bandwidth (Download)"
                                        name="bandWidthDownload"
                                        value={formik.values.bandWidthDownload || ''}
                                        onChange={formik.handleChange}
                                        showError={submitAttempted && formik.touched.bandWidthDownload && Boolean(formik.errors.bandWidthDownload)}
                                        error={Boolean(formik.errors.bandWidthDownload)}
                                        helperText={formik.errors.bandWidthDownload}
                                    />
                                    <FormControl fullWidth margin="normal">
                                        <Select
                                            id="bandWidthDownloadSpeed"
                                            value={formik.values.bandWidthDownloadSpeed}
                                            onChange={formik.handleChange}
                                            size="small"
                                            name='bandWidthDownloadSpeed'
                                        >
                                            <MenuItem value={'Mbps'}>Mbps</MenuItem>
                                            <MenuItem value={'Kbps'}>Kbps</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <FormTextField
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={formik.values.description || ''}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="demo-simple-select-label" size="small">
                                        Package Type
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="package_type"
                                        size="small"
                                        name="package_type"
                                        value={formik.values.package_type}
                                        onChange={formik.handleChange}
                                    >
                                        {packageTypes.map((type, index) => (
                                            <MenuItem key={index} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="price"
                                    label="Price to subscriber"
                                    variant="outlined"
                                    fullWidth
                                    name="price"
                                    type="text"
                                    margin="normal"
                                    size="small"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isChargeTax"
                                            checked={formik.values.isChargeTax}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Do not charge tax"
                                />
                                {!formik.values.isChargeTax &&
                                    <>
                                        <Box border={'1px solid'} p={2} borderRadius={2}>
                                            <Typography >Taxes</Typography>
                                            <Typography fontSize={12}>No Taxes</Typography>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        name="isRoundAppplicable"
                                                        checked={formik.values.isRoundAppplicable}
                                                        onChange={formik.handleChange}
                                                    />
                                                }
                                                label="Round off applicable"
                                            />
                                            <FormTextField
                                                id="priceAfterTax"
                                                label="Price to subscriber after tax"
                                                name="priceAfterTax"
                                                value={formik.values.priceAfterTax || ''}
                                                onChange={formik.handleChange}
                                            />
                                        </Box>
                                    </>
                                }
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isHotspot"
                                            checked={formik.values.isHotspot}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Available for hotspot subscribers"
                                />
                                {formik.values.isHotspot &&
                                    <>
                                        <Box border={'1px solid'} p={2} borderRadius={2}>
                                            <TextField
                                                id="advertisementInternal"
                                                label="Advertisement interval"
                                                variant="outlined"
                                                fullWidth
                                                name="advertisementInternal"
                                                type="text"
                                                margin="normal"
                                                value={formik.values.advertisementInternal}
                                                onChange={formik.handleChange}
                                                size="small"
                                                error={submitAttempted && formik.touched.advertisementInternal && Boolean(formik.errors.advertisementInternal)}
                                                helperText={submitAttempted && formik.touched.advertisementInternal && formik.errors.advertisementInternal}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">Seconds</InputAdornment>,
                                                }}
                                            />
                                            <FormTextField
                                                id="advertisementUrl"
                                                label="Advertisement url"
                                                name="advertisementUrl"
                                                value={formik.values.advertisementUrl || ''}
                                                onChange={formik.handleChange}
                                                showError={submitAttempted && formik.touched.advertisementUrl && Boolean(formik.errors.advertisementUrl)}
                                                error={Boolean(formik.errors.advertisementUrl)}
                                                helperText={formik.errors.advertisementUrl}
                                            />
                                        </Box>
                                    </>
                                }
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="onlinePayment"
                                            value={formik.values.onlinePayment}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Available for online payment"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isBindPool"
                                            checked={formik.values.isBindPool}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Bind IP pool"
                                />
                                {formik.values.isBindPool &&
                                    <>
                                        <Box border={'1px solid'} p={2} borderRadius={2}>
                                            <FormTextField
                                                id="ipPoolName"
                                                label="IP Pool Name (Must exist in router)"
                                                name="ipPoolName"
                                                value={formik.values.ipPoolName || ''}
                                                onChange={formik.handleChange}
                                            />
                                            <FormTextField
                                                id="fupIpPoolName"
                                                label="FUP IP Pool Name (Must exist in router)"
                                                name="fupIpPoolName"
                                                value={formik.values.fupIpPoolName || ''}
                                                onChange={formik.handleChange}
                                            />
                                        </Box>
                                    </>
                                }
                            </Grid>
                        </Grid>
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