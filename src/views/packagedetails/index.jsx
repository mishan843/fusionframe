import React, { useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    Paper,
    Divider,
    Button,
    Tooltip,
} from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import Details from './Details';
import AudiTrail from './AudiTrail';
import style from './packagedetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPackage from 'views/packagelist/AddPackage';
import Burstable from './Burstable';
import Minimum from './Minimum';
import Limits from './Limits';
import TimeSlots from './TimeSlots';
import AddressList from './AddressList';
import { deletePackage, getPackageDetail } from 'services/PackageService';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';

const PackageDetails = () => {
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('details');
    const [openDetails, setOpenDetails] = useState(false);
    const [open, setOpen] = useState(false);
    const [packageDetail, setPackageDetail] = useState([]);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const { userId } = useParams()
    const navigate = useNavigate()

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const breadcrumbs = [
        { label: 'Plan Management' },
        { label: 'Package List', link: '/plan-management/packagelist' },
    ];

    const handleEdit = () => {
        if (selectedTab === 'details') {
            setOpenDetails(true);
        } else if (selectedTab === 'burstable') {
            //
        } else if (selectedTab === 'kycdocuments') {
            // handle edit for kycdocuments tab
        }
    };
    const getPackageDetails = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const response = await getPackageDetail(params);
            setPackageDetail(response?.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnDelete = async () => {
        try {
            setLoading(true)
            const params = {
                id: userId
            }
            await deletePackage(params);
            navigate('/plan-management/packagelist')
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPackageDetails();
    }, []);

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={`Package 100mbps  `}
                breadcrumbs={breadcrumbs}
                typography={'Package Details'}
            />
            <Grid container spacing={gridSpacing}
                sx={{
                    marginTop: 1,
                    marginBottom: 4,
                    marginLeft: 0,
                    width: '100%',
                    paddingRight: '24px'
                }}>
                <Grid item xs={12} lg={4}>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
                            <Toolbar>
                                <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>Status: Enable</Typography>
                            </Toolbar>
                        </AppBar>
                        <Box>
                            <Paper sx={{ padding: 1, display: 'flex', flexDirection: 'column', gap: '8px', borderRadius: '0' }}>
                                <Button fullWidth variant='contained' >
                                    Publish Package
                                </Button>
                                <Button fullWidth variant='contained' >
                                    Disable Package
                                </Button>
                            </Paper>
                            <Divider />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ width: '100%', borderRadius: '0', marginBottom: '16px' }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Tabs value={selectedTab} onChange={handleChangeTab} className={style.tabs}>
                                <Tab label="Details" value="details" />
                                <Tab label="Burstable" value="burstable" />
                                <Tab label="Minimum" value="minimun" />
                                <Tab label="Limits" value="limits" />
                                <Tab label="Time Slot" value="timeslot" />
                                <Tab label="Address List" value="addresslist" />
                                <Tab label="Audit Trail" value="audittrail" />
                            </Tabs>
                            <Box display={'flex'} alignItems={'center'} gap={2} mr={1}>
                                {['details', 'burstable', 'minimum', 'limits', 'timeslot', 'addresslist'].includes(selectedTab) && (
                                    <Button variant="text" onClick={handleEdit}>
                                        <Tooltip title="Edit">
                                            <EditNoteIcon />
                                        </Tooltip>
                                        Edit
                                    </Button>
                                )}
                                <Button variant="contained" color='error' onClick={() => setOpen(true)} >
                                    <Tooltip title="Delete">
                                        <DeleteIcon />
                                    </Tooltip>
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            {selectedTab === 'details' && <Details packageDetail={packageDetail} />}
                            {selectedTab === 'burstable' && <Burstable />}
                            {selectedTab === 'minimun' && <Minimum />}
                            {selectedTab === 'limits' && <Limits />}
                            {selectedTab === 'timeslot' && <TimeSlots />}
                            {selectedTab === 'addresslist' && <AddressList />}
                            {selectedTab === 'audittrail' && <AudiTrail />}
                        </Box>
                    </Paper>
                </Grid>
            </Grid >
            <AddPackage
                open={openDetails}
                setOpen={setOpenDetails}
                getPackageData={getPackageDetails}
                packageDetail={packageDetail}
                getPackageDetails={getPackageDetails}
                mode="edit"
            />
            <DeleteModal
                open={open}
                handleClose={handleClose}
                message="Package"
                handleOnDelete={handleOnDelete}
            />
        </>
    );
};

export default PackageDetails;