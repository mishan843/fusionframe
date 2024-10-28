import React from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Button,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { deleteRole, UpdateRole } from 'services/RoleService';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteModal from 'views/modal/DeleteModal';

const permissionsData = [
    {
        category: {
            label: 'Subscribers',
            key: 'subscribersPermissions'
        },
        permissions: [
            { label: 'Delete', key: 'delete' },
            { label: 'Reset Mac Address', key: 'resetMacAddress' },
            { label: 'Assign Package', key: 'assignPackage' },
            { label: 'Change Package', key: 'changePackage' },
            { label: 'Previous Usage', key: 'previewUsage' },
            { label: 'Renew Package', key: 'renewPackage' },
            { label: 'Terminate', key: 'terminate' },
            { label: 'Renew In Advance', key: 'renewInAdvance' },
            { label: 'Cancel Advance Renewal', key: 'cancleAdvanceRenewal' },
            { label: 'Change Expiry Date', key: 'changeExpiryDate' },
            { label: 'Override Package Speed', key: 'overridePackageSpeed' },
            { label: 'Top Up Data', key: 'topUpData' },
            { label: 'Change Password', key: 'changePassword' },
            { label: 'Change Migrate', key: 'changeMigrate' },
            { label: 'Search Users', key: 'searchUsers' },
            { label: 'Current Usage', key: 'currentUsage' },
            { label: 'Online Lists', key: 'onlineLists' },
            { label: 'Disable', key: 'disable' },
            { label: 'Enable', key: 'enable' },
            { label: 'Disconnect', key: 'disconnect' },
            { label: 'Assign Fix Ip', key: 'assignFixIP' },
            { label: 'Send Message', key: 'sendMessage' },
            { label: 'Read Audit Log', key: 'readAuditLog' },
            { label: 'Create', key: 'create' },
            { label: 'Edit', key: 'edit' }
        ]
    },
    {
        category: {
            label: 'Reseller',
            key: 'resellerPermissions'
        },
        permissions: [
            { label: 'Create', key: 'create' },
            { label: 'Edit', key: 'edit' },
            { label: 'Delete', key: 'delete' },
            { label: 'Search', key: 'search' },
            { label: 'Employee Information', key: 'employeeInformation' },
            { label: 'Balance Transfer History', key: 'balanceTransferHistory' },
            { label: 'Information', key: 'information' },
            { label: 'Config', key: 'config' },
            { label: 'Add Balance', key: 'addBalance' },
            { label: 'Document', key: 'document' }
        ]
    },
    {
        category: {
            label: 'LCO',
            key: 'lcoPermissions'
        },
        permissions: [
            { label: 'Create', key: 'create' },
            { label: 'Edit', key: 'edit' },
            { label: 'Delete', key: 'delete' },
            { label: 'Search', key: 'search' },
            { label: 'Employee Information', key: 'employeeInformation' },
            { label: 'Balance Transfer History', key: 'balanceTransferHistory' },
            { label: 'Information', key: 'information' },
            { label: 'Document', key: 'document' }
        ]
    },
    {
        category: {
            label: 'Inquiry',
            key: 'enquiryPermissions'
        },
        permissions: [
            { label: 'Create', key: 'create' },
            { label: 'Edit', key: 'edit' },
            { label: 'Delete', key: 'delete' },
            { label: 'Search', key: 'search' },
            { label: 'Convert To Customer', key: 'convertToCustomer' },
            { label: 'All View', key: 'allView' },
            { label: 'Document View', key: 'documentView' }
        ]
    }
];

const PermissionTable = ({ roleDetails, open, setOpen, getRoleDetails, setLoading }) => {
    const [checkedPermissions, setCheckedPermissions] = useState(roleDetails);
    const [openDelete, setOpenDelete] = useState(false);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const { userId } = useParams()
    const userdata = localStorage.getItem('userdata')
    const Id = JSON.parse(userdata)?._id
    const navigate = useNavigate()

    permissionsData.forEach(category => {
        Object.keys(roleDetails).forEach(key => {
            if (category.hasOwnProperty(key)) {
                category[key] = roleDetails[key];
                category.permissions.forEach(permission => {
                    permission.value = roleDetails[key][permission.key];
                });
            }
        });
    });

    const handleOnChange = (permission, categoryData) => {
        const updatedPermissions = { ...checkedPermissions };

        if (!updatedPermissions[categoryData.category.key]) {
            updatedPermissions[categoryData.category.key] = {};
        }

        updatedPermissions[categoryData.category.key][permission.key] = !updatedPermissions[categoryData.category.key][permission.key];

        setCheckedPermissions(updatedPermissions);
    }

    const handleSelectAll = () => {
        const updatedRoleDetails = { ...checkedPermissions };
        const categories = ["enquiryPermissions", "lcoPermissions", "resellerPermissions", "subscribersPermissions"];

        categories.forEach((category) => {
            Object.keys(updatedRoleDetails[category]).forEach((permission) => {
                updatedRoleDetails[category][permission] = true;
            });
        });

        setCheckedPermissions(updatedRoleDetails);
    };

    const handleDeSelectAll = () => {
        const updatedRoleDetails = { ...checkedPermissions };
        const categories = ["enquiryPermissions", "lcoPermissions", "resellerPermissions", "subscribersPermissions"];

        categories.forEach((category) => {
            Object.keys(updatedRoleDetails[category]).forEach((permission) => {
                updatedRoleDetails[category][permission] = false;
            });
        });

        setCheckedPermissions(updatedRoleDetails);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const data = {
                designation: checkedPermissions.designation,
                subscribersPermissions: { ...checkedPermissions.subscribersPermissions },
                resellerPermissions: { ...checkedPermissions.resellerPermissions },
                lcoPermissions: { ...checkedPermissions.lcoPermissions },
                enquiryPermissions: { ...checkedPermissions.enquiryPermissions },
                created_by: Id
            };
            await UpdateRole(data, userId);
            getRoleDetails()
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleOnDelete = async () => {
        try {
            const params = {
                id: userId
            }
            setLoading(true)
            const respose = await deleteRole(params);
            if (!respose?.error) {
                navigate('/user-management/role-management')
            }
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => {
        setOpenDelete(false)
    }

    <DeleteModal
        open={open}
        handleClose={handleClose}
        message="Role"
        handleOnDelete={handleOnDelete}
    />

    return (
        <Box >
            <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: '0' }}>
                <Table >
                    <TableHead sx={{ backgroundColor: backgroundColor }}>
                        <TableRow >
                            <TableCell sx={{ color: '#FFF' }}>Category</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Permissions
                                <Button variant="outlined" size='small' sx={{ marginRight: 1, marginLeft: 3, color: '#FFF', borderColor: '#FFF' }} onClick={handleSelectAll}>Select all</Button>
                                <Button variant="outlined" size='small' sx={{ color: '#FFF', borderColor: '#FFF' }} onClick={handleDeSelectAll}>Deselect all</Button>
                            </TableCell>
                            <TableCell> <Box display={'flex'}>
                                <Button variant="text" sx={{ fontSize: '1rem', flexGrow: 1, textAlign: 'end', cursor: 'pointer', color: '#FFF' }} onClick={() => setOpenDelete(true)}> <DeleteIcon /> Delete</Button>
                                <Button variant="text" sx={{ fontSize: '1rem', flexGrow: 1, textAlign: 'end', cursor: 'pointer', color: '#FFF' }} onClick={() => setOpen(false)}> Cancel</Button>
                                <Button variant="text" sx={{ fontSize: '1rem', flexGrow: 1, textAlign: 'end', cursor: 'pointer', color: '#FFF' }} onClick={handleSubmit} ><SaveIcon /> Save</Button>
                            </Box> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {permissionsData.map(categoryData => (
                            <TableRow key={categoryData.category.label}>
                                <TableCell>{categoryData.category.label}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {categoryData.permissions.map(permission => (
                                            <Box key={permission} sx={{ width: '33.33%', display: 'flex', alignItems: 'center' }}>
                                                <Checkbox
                                                    size='small'
                                                    checked={checkedPermissions[categoryData.category.key] ? checkedPermissions[categoryData.category.key][permission.key] : permission.value}
                                                    onChange={() => handleOnChange(permission, categoryData)}
                                                />
                                                <Typography variant="body2">{permission?.label}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteModal
                open={openDelete}
                handleClose={handleClose}
                message="Role"
                handleOnDelete={handleOnDelete}
            />
        </Box>
    );
};

export default PermissionTable;