import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { getIPAddress, getIPPool } from 'services/IPPoolAddress';
import { useParams } from 'react-router-dom';
import { addSRCNAT } from 'services/SRCNATService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    overflow: 'auto',
};

const validationSchema = Yup.object().shape({
    publicIpPool: Yup.object().required('Public IP Pool is required'),
    privateIpPool: Yup.object().required('Private IP Pool is required'),
});

export default function ConfigerIPNAT({ open, setOpen, nasDetails, getSRCNATData, setLoading }) {
    const [publicIPPoolData, setPublicIPPoolData] = useState([])
    const [publicID, setPublicID] = useState('')
    const [availablePublicIp, setAvailablePublicIp] = useState('')
    const [availablePrivateIp, setAvailablePrivateIp] = useState('')
    const [privateIPPoolData, setPrivateIPPoolData] = useState([])
    const [privateID, setPrivateID] = useState('')

    const { userId } = useParams()

    const formik = useFormik({
        initialValues: {
            publicIpPool: '',
            availablePublicIp: '',
            privateIpPool: '',
            availablePrivateIp: '',
            provisioning: false,
            ratio: '',
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    nasId: userId,
                    publicIpPool: values.publicIpPool?.networkIp || '',
                    privateIpPool: values.privateIpPool?.networkIp || '',
                }
                setLoading(true)
                await addSRCNAT(data)
                getSRCNATData()
                handleClose()
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
        setAvailablePrivateIp('')
        setAvailablePublicIp('')
        setPublicID('')
        setPrivateID('')
        formik.resetForm();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await formik.submitForm();
    };

    const gcd = (a, b) => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const getRatio = (numerator, denominator) => {
        const divisor = gcd(numerator, denominator);
        const simplifiedNumerator = numerator / divisor;
        const simplifiedDenominator = denominator / divisor;
        return `${simplifiedNumerator}:${simplifiedDenominator}`;
    };

    useEffect(() => {
        const calculateRatio = () => {
            const { availablePublicIp, availablePrivateIp } = formik.values;
            if (availablePublicIp && availablePrivateIp) {
                formik.setFieldValue('ratio', getRatio(availablePrivateIp, availablePublicIp));
            } else {
                formik.setFieldValue('ratio', '');
            }
        };
        calculateRatio();
    }, [formik.values.availablePublicIp, formik.values.availablePrivateIp]);

    const getIPPoolData = async (tagIPPool) => {
        try {
            const params = {
                tagIpPool: tagIPPool,
                nasId: nasDetails?._id
            }
            setLoading(true)
            if (nasDetails?._id) {
                const response = await getIPPool(params);

                if (tagIPPool === 'private') {
                    setPrivateIPPoolData(response?.ipPools);
                }
                else {
                    setPublicIPPoolData(response?.ipPools)
                }
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getIPPoolData('public');
        getIPPoolData('private');
    }, [nasDetails]);

    const getIPAddressData = async (id, setAvailableIp) => {
        try {
            const params = {
                poolId: id,
            }
            setLoading(true)
            if (id) {
                const response = await getIPAddress(params);
                setAvailableIp(response?.total)
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getIPAddressData(publicID, setAvailablePublicIp);
    }, [publicID]);

    useEffect(() => {
        getIPAddressData(privateID, setAvailablePrivateIp);
    }, [privateID]);

    useEffect(() => {
        formik.setFieldValue('availablePrivateIp', availablePrivateIp);
        formik.setFieldValue('availablePublicIp', availablePublicIp);
    }, [availablePrivateIp, availablePublicIp])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container columnSpacing={6} rowSpacing={1} >
                        <Grid item md={12} lg={12} xs={12}>
                            <Box sx={{ padding: 1, borderRadius: '0' }}>
                                <Typography variant="h3">Configure SRC-NAT</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid container columnSpacing={6} rowSpacing={1} mt={1} >
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Private IP Pool <span style={{ color: 'red' }}>*</span></Typography>
                                    <FormControl fullWidth sx={{ width: '60%' }}>
                                        <Select
                                            id="privateIpPool"
                                            value={formik.values.privateIpPool}
                                            onChange={(e) => {
                                                const selectedItem = e.target.value;
                                                formik.setFieldValue('privateIpPool', selectedItem);
                                                setPrivateID(selectedItem?._id);
                                            }}
                                            size="small"
                                            name='privateIpPool'
                                            error={formik.touched.privateIpPool && Boolean(formik.errors.privateIpPool)}
                                        >
                                            <MenuItem value={' '}>Select</MenuItem>
                                            {privateIPPoolData?.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item?.networkIp}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.privateIpPool && formik.errors.privateIpPool && (
                                            <FormHelperText error>{formik.errors.privateIpPool}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Available Private IPs</Typography>
                                    <TextField
                                        id="availablePrivateIp"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="availablePrivateIp"
                                        size="small"
                                        value={formik.values.availablePrivateIp}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Public IP Pool <span style={{ color: 'red' }}>*</span></Typography>
                                    <FormControl fullWidth sx={{ width: '60%' }}>
                                        <Select
                                            id="publicIpPool"
                                            value={formik.values.publicIpPool}
                                            onChange={(e) => {
                                                const selectedItem = e.target.value;
                                                formik.setFieldValue('publicIpPool', selectedItem);
                                                setPublicID(selectedItem?._id);
                                            }}
                                            size="small"
                                            name='publicIpPool'
                                            error={formik.touched.publicIpPool && Boolean(formik.errors.publicIpPool)}
                                        >
                                            <MenuItem value={''}>Select</MenuItem>
                                            {publicIPPoolData?.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item?.networkIp}</MenuItem>
                                            ))}
                                        </Select>
                                        {formik.touched.publicIpPool && formik.errors.publicIpPool && (
                                            <FormHelperText error>{formik.errors.publicIpPool}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Available Public IPs</Typography>
                                    <TextField
                                        id="availablePublicIp"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="availablePublicIp"
                                        size="small"
                                        value={formik.values.availablePublicIp}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Provisioning</Typography>
                                    <Box sx={{ width: '60%' }} >
                                        <Checkbox
                                            id="provisioning"
                                            name="provisioning"
                                            checked={formik.values.provisioning}
                                            onChange={formik.handleChange}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0', py: '10px' }}>
                                    <Typography variant="body1">Ratio</Typography>
                                    <Box sx={{ width: '60%', px: '10px' }} >
                                        {formik.values.ratio}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box display={'flex'} gap={2} mt={2} justifyContent={'end'} >
                            <Button variant="contained" type="submit" sx={{ width: '100px' }}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={handleClose} sx={{ width: '100px' }}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}