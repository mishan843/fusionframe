import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { calculateSubnetMask } from 'ip-subnet-calculator';
import * as IPSubnetCalculator from 'ip-subnet-calculator';
import { useState } from 'react';
import { addIPPool, UpdateIPPool } from 'services/IPPoolAddress';
import { useParams } from 'react-router-dom';

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

export default function AddIPPool({ open, setOpen, ipPoolDetails, getIPPoolDetails, getIPPoolData }) {
    const [tagIpPool, settagIpPool] = useState('private');
    const nasId = useParams()
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id

    const privateIpRanges = [
        [167772160, 184549375],
        [2886729728, 2887778303],
        [3232235520, 3232301055],
    ];

    const formik = useFormik({
        initialValues: {
            poolName: '',
            tagIpPool: 'private',
            ipPrifix: '',
            status: 'active',
            netMask: '',
            networkIp: '',
            broadcastIp: '',
            firstHost: '',
            lastHost: '',
            totalHost: '',
            provisioning: false,
            remark: '',
            allIps: '',
            isAllip: false,
        },
        validationSchema: Yup.object().shape({
            poolName: Yup.string().required('Pool name is required'),
            ipPrifix: Yup.string().required('IP / Prifix is required').test('ip-prifix', `Please enter valid ${tagIpPool} IP address`, (value, context) => {
                if (context.parent.tagIpPool === 'private') {
                    const [ip, prefix] = value.split('/');
                    const decimalIp = IPSubnetCalculator.toDecimal(ip);
                    for (const range of privateIpRanges) {
                        if (decimalIp >= range[0] && decimalIp <= range[1]) {
                            return true;
                        }
                    }
                    return false;
                } else if (context.parent.tagIpPool === 'public') {
                    const [ip, prefix] = value.split('/');
                    const decimalIp = IPSubnetCalculator.toDecimal(ip);
                    for (const range of privateIpRanges) {
                        if (decimalIp >= range[0] && decimalIp <= range[1]) {
                            return false;
                        }
                    }
                    return true;
                }
                return true;
            }),
        }),
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    nasId: nasId?.userId,
                    created_by: userId,
                    totalHost: values?.allIps - 2
                };

                if (ipPoolDetails) {
                    await UpdateIPPool(data, ipPoolDetails?._id)
                    getIPPoolDetails()

                } else {
                    await addIPPool(data)
                    getIPPoolData()
                }

                handleClose()
            } catch (error) {
                console.error(error);
            }
        },
    });

    function incrementIp(ipAddress) {
        const parts = ipAddress.split('.');
        const lastPart = parseInt(parts[3], 10);
        parts[3] = (lastPart + 1).toString();
        return parts.join('.');
    }

    function decrementIp(ipAddress) {
        const parts = ipAddress.split('.');
        const lastPart = parseInt(parts[3], 10);
        parts[3] = (lastPart - 1).toString();
        return parts.join('.');
    }

    const resetFormFields = () => {
        formik.setFieldValue('netMask', '');
        formik.setFieldValue('networkIp', '');
        formik.setFieldValue('broadcastIp', '');
        formik.setFieldValue('firstHost', '');
        formik.setFieldValue('lastHost', '');
        formik.setFieldValue('totalHost', '');
    };

    useEffect(() => {
        if (formik.values.ipPrifix) {
            const [ip, prefix] = formik.values.ipPrifix.split('/');
            if (ip && prefix) {
                const prefixValue = parseInt(prefix, 10);
                if (prefixValue >= 0 && prefixValue <= 32) {
                    try {
                        const subnetInfo = calculateSubnetMask(ip, prefixValue);
                        console.log(subnetInfo)
                        if (subnetInfo) {
                            formik.setFieldValue('netMask', subnetInfo.prefixMaskStr);
                            formik.setFieldValue('networkIp', formik.values.ipPrifix);
                            formik.setFieldValue('broadcastIp', subnetInfo.ipHighStr);
                            formik.setFieldValue('firstHost', incrementIp(subnetInfo.ipLowStr));
                            formik.setFieldValue('lastHost', decrementIp(subnetInfo.ipHighStr));
                            formik.setFieldValue('totalHost', formik.values.isAllip ? subnetInfo.invertedMask + 1 : subnetInfo.invertedMask - 1);
                            formik.setFieldValue('allIps', subnetInfo.invertedMask + 1);
                        } else {
                            console.error("Error calculating subnet info");
                            resetFormFields();
                        }
                    } catch (error) {
                        console.error("Error:", error.message);
                        resetFormFields();
                        formik.setFieldError('ipPrifix', error.message);
                    }
                } else {
                    console.error("Invalid prefix value");
                    resetFormFields();
                    formik.setFieldError('ipPrifix', 'Invalid prefix value');
                }
            }
        }
    }, [formik.values.ipPrifix, formik.values.isAllip]);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await formik.submitForm();
    };

    useEffect(() => {
        if (ipPoolDetails) {
            formik.setValues({
                poolName: ipPoolDetails ? ipPoolDetails.poolName : '',
                tagIpPool: ipPoolDetails ? ipPoolDetails.tagIpPool : 'private',
                ipPrifix: ipPoolDetails ? ipPoolDetails.ipPrifix : '',
                status: ipPoolDetails ? ipPoolDetails.status : 'active',
                netMask: ipPoolDetails ? ipPoolDetails.netMask : '',
                networkIp: ipPoolDetails ? ipPoolDetails.networkIp : '',
                broadcastIp: ipPoolDetails ? ipPoolDetails.broadcastIp : '',
                firstHost: ipPoolDetails ? ipPoolDetails.firstHost : '',
                lastHost: ipPoolDetails ? ipPoolDetails.lastHost : '',
                totalHost: ipPoolDetails
                    ? ipPoolDetails.isAllip
                        ? Number(ipPoolDetails.totalHost) + 2
                        : Number(ipPoolDetails.totalHost)
                    : '',
                provisioning: ipPoolDetails ? ipPoolDetails.provisioning : false,
                remark: ipPoolDetails ? ipPoolDetails.remark : '',
                allIps: ipPoolDetails ? ipPoolDetails.allIps : '',
                isAllip: ipPoolDetails ? ipPoolDetails.isAllip : false,
            });
        }
    }, [ipPoolDetails, open]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography id="modal-modal-title" fontSize={'1.5rem'}>
                            {ipPoolDetails ? 'Edit IP Pool' : 'Add IP Pool'}
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
                        <Grid container columnSpacing={6} rowSpacing={1} mt={2}>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Pool Name <span style={{ color: 'red' }}>*</span></Typography>
                                    <TextField
                                        id="poolName"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="poolName"
                                        size="small"
                                        value={formik.values.poolName || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.poolName && Boolean(formik.errors.poolName)}
                                        helperText={formik.touched.poolName && formik.errors.poolName}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Tag IP pool as</Typography>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={formik.values.tagIpPool || ''}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                settagIpPool(e.target.value);
                                                formik.setTouched({ ipPrifix: false }, false); // Reset error for ipPrifix field
                                            }}
                                            name="tagIpPool"
                                        >
                                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">IP / Prifix <span style={{ color: 'red' }}>*</span></Typography>
                                    <TextField
                                        id="ipPrifix"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="ipPrifix"
                                        size="small"
                                        value={formik.values.ipPrifix || ''}
                                        onChange={formik.handleChange}
                                        error={formik.touched.ipPrifix && Boolean(formik.errors.ipPrifix)}
                                        helperText={formik.touched.ipPrifix && formik.errors.ipPrifix}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Status</Typography>
                                    <FormControl fullWidth sx={{ width: '60%' }}>
                                        <Select
                                            id="status"
                                            value={formik.values.status || ''}
                                            onChange={formik.handleChange}
                                            size="small"
                                            name='status'
                                        >
                                            <MenuItem value={'active'}>Active</MenuItem>
                                            <MenuItem value={'inactive'}>InActive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">netMask</Typography>
                                    <TextField
                                        id="netMask"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="netMask"
                                        size="small"
                                        value={formik.values.netMask || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Network IP</Typography>
                                    <TextField
                                        id="networkIp"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="networkIp"
                                        size="small"
                                        value={formik.values.networkIp || ''}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Broadcast IP</Typography>
                                    <TextField
                                        id="broadcastIp"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="broadcastIp"
                                        size="small"
                                        value={formik.values.broadcastIp || ''}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">First host</Typography>
                                    <TextField
                                        id="firstHost"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="firstHost"
                                        size="small"
                                        value={formik.values.firstHost || ''}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Last host</Typography>
                                    <TextField
                                        id="lastHost"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="lastHost"
                                        size="small"
                                        value={formik.values.lastHost || ''}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Total host</Typography>
                                    <TextField
                                        id="totalHost"
                                        variant="outlined"
                                        sx={{ width: '60%' }}
                                        name="totalHost"
                                        size="small"
                                        value={formik.values.totalHost || ''}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">provisioning</Typography>
                                    <Box sx={{ width: '60%' }} >
                                        <Checkbox
                                            id="provisioning"
                                            name="provisioning"
                                            checked={formik.values.provisioning || false}
                                            value={formik.values.provisioning || false}
                                            onChange={formik.handleChange}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={6} xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">All IPs</Typography>
                                    <Box sx={{ width: '60%' }} >
                                        <Checkbox
                                            id="isAllip"
                                            name="isAllip"
                                            checked={formik.values.isAllip || false}
                                            value={formik.values.isAllip || false}
                                            onChange={formik.handleChange}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={12} lg={12} xs={12} >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                                    <Typography variant="body1">Remark :</Typography>
                                    <TextField
                                        id="remark"
                                        variant="outlined"
                                        multiline
                                        rows={3}
                                        sx={{
                                            width: {
                                                lg: '80.8%',
                                                md: '60%'
                                            },
                                        }}
                                        name="remark"
                                        size="small"
                                        value={formik.values.remark || ''}
                                        onChange={formik.handleChange}
                                    />
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