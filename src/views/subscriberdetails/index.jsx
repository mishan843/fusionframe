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
    Tooltip
} from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import Details from './Details';
import AudiTrail from './AudiTrail';
import style from './subscriberdetail.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import Connection from './Connection';
import KYCDocuments from './KYCDocuments';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { deleteSubscriber, getSubscriberDetail } from 'services/SubscribersService';
import { useEffect } from 'react';
import EditConnection from './EditConnection';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectSMS from './DirectSMS';
import SubscriberInfo from './SubscriberInfo';
import CurrentPreviousPackage from './CurrentPreviousPackage';
import ViewBalance from './ViewBalance';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';

const SubscriberDetails = () => {
    const [selectedTab, setSelectedTab] = useState('details');
    const [openConnection, setOpenConnection] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [subscriberDetail, setSubscriberDetail] = useState([]);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const { userId } = useParams()
    const navigate = useNavigate()

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const breadcrumbs = [
        { label: 'User Management' },
        { label: 'Subscribers', link: '/user-management/subscribers' },
    ];

    const handleEdit = () => {
        if (selectedTab === 'details') {
            navigate(`/user-management/subscribers/edit-subscriber/${userId}`)
        } else if (selectedTab === 'connection') {
            setOpenConnection(true);
        } else if (selectedTab === 'kycdocuments') {
            // handle edit for kycdocuments tab
        }
    };

    const getSubscriberDetails = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const response = await getSubscriberDetail(params);
            setSubscriberDetail(response?.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSubscriberDetails();
    }, []);

    const handleOnDelete = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const respose = await deleteSubscriber(params);
            setLoading(false)
            if (!respose?.error) {
                navigate('/user-management/subscribers')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {loading && <CircleLoader />}
            <>
                <BreadcrumbsCommon
                    heading={`Subscriber : ${subscriberDetail?.name || ''} `}
                    breadcrumbs={breadcrumbs}
                    typography={'Subscriber Details'}
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
                                    <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>Status: Created New</Typography>
                                </Toolbar>
                            </AppBar>
                            <Box>
                                <Paper sx={{ padding: 1, display: 'flex', flexDirection: 'column', gap: '8px', borderRadius: '0' }}>
                                    <Button fullWidth variant='contained' >
                                        Reset MCD Address
                                    </Button>
                                    <Button fullWidth variant='contained' >
                                        Disable Subscriber
                                    </Button>
                                    <Button fullWidth variant='contained' >
                                        Change Password
                                    </Button>
                                    <Button fullWidth variant='contained' >
                                        Generate CAF (PDF)
                                    </Button>
                                </Paper>
                                <Divider />
                            </Box>
                        </Box>
                        <Box mt={1}>
                            <DirectSMS />
                        </Box>
                        <Box mt={1}>
                            <SubscriberInfo />
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ width: '100%', borderRadius: '0', marginBottom: '16px' }}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Tabs value={selectedTab} onChange={handleChangeTab} className={style.tabs}>
                                    <Tab label="Details" value="details" />
                                    <Tab label="Connection" value="connection" />
                                    <Tab label="KYCDocuments" value="kycdocuments" />
                                    <Tab label="Audit Trail" value="audittrail" />
                                </Tabs>
                                <Box display={'flex'} alignItems={'center'} gap={2} mr={1}>
                                    {['details', 'connection', 'kycdocuments'].includes(selectedTab) && (
                                        <Button variant="text" onClick={handleEdit}>
                                            <Tooltip title="Edit">
                                                <EditNoteIcon />
                                            </Tooltip>
                                            Edit
                                        </Button>
                                    )}
                                    <Button variant="contained" color='error' onClick={() => setOpen(true)} padding={2}>
                                        <Tooltip title="Delete">
                                            <DeleteIcon />
                                        </Tooltip>
                                    </Button>
                                </Box>
                            </Box>
                            <Box>
                                {selectedTab === 'details' && <Details subscriberDetail={subscriberDetail} />}
                                {selectedTab === 'connection' && <Connection />}
                                {selectedTab === 'kycdocuments' && <KYCDocuments />}
                                {selectedTab === 'audittrail' && <AudiTrail />}
                            </Box>
                        </Paper>
                        <Grid container >
                            <Grid item xs={12} lg={7}>
                                <CurrentPreviousPackage />
                            </Grid>

                            <Grid item xs={12} lg={5}>
                                <ViewBalance />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
                <EditConnection open={openConnection} setOpen={setOpenConnection} />
                <DeleteModal
                    open={open}
                    handleClose={handleClose}
                    message="Subscriber"
                    handleOnDelete={handleOnDelete}
                />
            </>
        </>
    );
};

export default SubscriberDetails;