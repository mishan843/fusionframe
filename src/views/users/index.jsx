import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { getUser } from 'services/UsersService';
import AddUsers from './AddUsers';
import { Link } from 'react-router-dom';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'user_type', numeric: true, disablePadding: false, label: 'User Type' },
    { id: 'designation', numeric: false, disablePadding: false, label: 'Designation' },
];

export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [searchKey, setSearchKey] = useState(headCells[0]?.id);

    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const handleOpen = () => setOpen(true);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUserData = async () => {
        try {
            const params = {
                search: [`${searchKey},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage,
                created_by: userId
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            setLoading(true)
            const response = await getUser(params);
            setUserData(response?.users);
            setTotalRows(response?.total);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [{ label: 'User Management', link: '/' }];
    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];
    return (
        <>
            {loading && <CircleLoader />}

            <BreadcrumbsCommon heading={'Users'} breadcrumbs={breadcrumbs} typography={'Users'} />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CustomToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                        actions={actions}
                        options={headCells}
                        butLable='Users'
                    />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
                            <CommonTableHead
                                columns={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {userData?.length > 0 ? userData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/user-management/users/${row?._id}`}>{row.email}</Link></TableCell>
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/user-management/users/${row?._id}`}>{row.name}</Link></TableCell>
                                        <TableCell>{row.user_type}</TableCell>
                                        <TableCell>{row.designation}</TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={4}>No Data Found</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={totalRows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <AddUsers
                open={open}
                setLoading={setLoading}
                setOpen={setOpen}
                getUserData={getUserData}
            />
        </>
    );
}