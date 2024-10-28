import { AppBar, Button, Divider, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useSelector } from 'react-redux';
import PermissionsTable from './PermissionTable';
import { getRoleDetail } from 'services/RoleService';
import { useParams } from 'react-router-dom';
import CircleLoader from 'ui-component/cards/CircleLoader';

const RoleDetails = () => {
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [roleDetails, setRoleDetails] = useState([])
    const { userId } = useParams()

    const breadcrumbs = [
        { label: 'User Management' },
        { label: 'Role Management', link: '/user-management/role-management' },
    ];

    const getRoleDetails = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const response = await getRoleDetail(params);
            setRoleDetails(response?.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRoleDetails();
    }, []);

    return (
        <>
        {loading && <CircleLoader/>}
            <BreadcrumbsCommon
                heading={'Role Details'}
                breadcrumbs={breadcrumbs}
                typography={'Role Details'}
            />
            <Box sx={{ flexGrow: 1 }} m={2}>
                <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
                    <Toolbar>
                        <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>Details</Typography>
                        <Box display={'flex'} gap={1}>
                            {
                                !open &&
                                <Button variant="text" sx={{ fontSize: '1rem', flexGrow: 1, textAlign: 'end', cursor: 'pointer', color: '#FFF' }} onClick={() => setOpen(true)}><EditNoteIcon /> Edit</Button>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Paper sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                        <Typography variant="body1">Name :</Typography>
                        <Typography variant="h6" align="right">
                            {roleDetails?.name}
                        </Typography>
                    </Paper>
                    <Divider />
                    <Paper sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                        <Typography variant="body1">Destination :</Typography>
                        <Typography variant="h6" align="right">
                            {roleDetails?.designation}
                        </Typography>
                    </Paper>
                    <Divider />
                </Box>
                {
                    !open &&
                    <>
                        <Typography mt={2} mb={2} fontSize={22} fontWeight={500}>
                            Role does not have permissions
                        </Typography>
                        <Button variant="contained" startIcon={<EditNoteIcon />} onClick={() => setOpen(true)} >
                            Assign Permission
                        </Button>
                    </>
                }
                {
                    open && <PermissionsTable setLoading={setLoading} roleDetails={roleDetails} open={open} setOpen={setOpen} getRoleDetails={getRoleDetails} />
                }
            </Box>
        </>
    )
}

export default RoleDetails