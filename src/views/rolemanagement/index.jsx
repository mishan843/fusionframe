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
import { Link } from 'react-router-dom';
import AddRole from './AddRole';
import { getRoles } from 'services/RoleService';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'designation', numeric: false, disablePadding: false, label: 'Designation' },
];

export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [roleData, setRoleData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState(headCells[0]?.id);

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

    const getRoleData = async () => {
        try {
            setLoading(true)
            const params = {
                search: [`${searchKey},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            const response = await getRoles(params);
            setRoleData(response?.roles);
            setTotalRows(response?.total);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRoleData();
    }, [page, rowsPerPage, searchTerm, order, orderBy, searchKey]);

    const breadcrumbs = [{ label: 'User Management', link: '/' }];

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon heading={'Role Management'} breadcrumbs={breadcrumbs} typography={'Role Management'} />
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
                        butLable='Role'
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
                                {roleData?.length > 0 ? roleData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/user-management/role-management/${row?._id}`}>{row?.name}</Link></TableCell>
                                        <TableCell>{row?.designation}</TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={2}>Data Not Found</TableCell>
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
            <AddRole
                setLoading={setLoading}
                open={open}
                setOpen={setOpen}
                getRoleData={getRoleData}
            />
        </>
    );
}