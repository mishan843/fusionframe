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
import UserLoginTable from './UserLoginTable';
import Details from './Details';
import UserProfile from './UserProfile';
import WorkDone from './WorkDone';
import AudiTrail from './AudiTrail';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser, getUserDetail } from 'services/UsersService';
import { useEffect } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUsers from 'views/users/AddUsers';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';

const UserDetails = () => {
    const [selectedTab, setSelectedTab] = useState('details');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const { userId } = useParams()
    const [userDetails, setUserDetails] = useState([])
    const navigate = useNavigate()

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const breadcrumbs = [
        { label: 'User Management' },
        { label: 'Users', link: '/user-management/users' },
    ];

    const getUserDetails = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const response = await getUserDetail(params);
            setUserDetails(response?.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleOnDelete = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const respose = await deleteUser(params);
            if (!respose?.error) {
                navigate('/user-management/users')
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = () => {
        if (selectedTab === 'details') {
            setOpen(true)
        }
    };
    const handleClose = () => {
        setOpenDelete(false)
    }
    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={`User  ${userDetails?.name}`}
                breadcrumbs={breadcrumbs}
                typography={'User Details'}
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
                                <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>User : {userDetails?.name}</Typography>
                            </Toolbar>
                        </AppBar>
                        <Box>
                            <Paper sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                                <Typography variant="body1">email:</Typography>
                                <Typography variant="h6" align="right">
                                    {userDetails?.email}
                                </Typography>
                            </Paper>
                            <Divider />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Paper sx={{ width: '100%', borderRadius: '0', marginBottom: '16px' }}>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleChangeTab}
                                sx={{
                                    '& .MuiTabs-flexContainer': {
                                        overflow: 'auto'
                                    }
                                }}>
                                <Tab label="Details" value="details" />
                                <Tab label="User Profile" value="userprofile" />
                                <Tab label="Audit trail" value="audittrail" />
                                <Tab label="Work done" value="workdone" />
                            </Tabs>
                            <Box display={'flex'} alignItems={'center'} gap={2} mr={1}>
                                {selectedTab === 'details' && (
                                    <Button variant="text" onClick={handleEdit}>
                                        <Tooltip title="Edit">
                                            <EditNoteIcon />
                                        </Tooltip>
                                        Edit
                                    </Button>
                                )}
                                <Button variant="contained" color='error' onClick={() => setOpenDelete(true)} padding={2}>
                                    <Tooltip title="Delete">
                                        <DeleteIcon />
                                    </Tooltip>
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            {selectedTab === 'details' && <Details userDetails={userDetails} />}
                            {selectedTab === 'userprofile' && <UserProfile />}
                            {selectedTab === 'audittrail' && <AudiTrail />}
                            {selectedTab === 'workdone' && <WorkDone />}
                        </Box>
                    </Paper>
                    <UserLoginTable />
                </Grid>
            </Grid >
            <AddUsers
                open={open}
                setOpen={setOpen}
                userDetails={userDetails}
                getUserDetails={getUserDetails}
                setLoading={setLoading}
            />
            <DeleteModal
                open={openDelete}
                handleClose={handleClose}
                message="User"
                handleOnDelete={handleOnDelete}
            />
        </>
    );
};

export default UserDetails;