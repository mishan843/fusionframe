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
import AddPackage from './AddPackage';
import { Link } from 'react-router-dom';
import { getPackage } from 'services/PackageService';
import moment from 'moment';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Plan' },
    { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
    { id: 'onlinePayment', numeric: true, disablePadding: false, label: 'Online Payment' },
    { id: 'package_type', numeric: false, disablePadding: false, label: 'Package Type' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
];

export default function PackageList() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [packageData, setPackageData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [searchKey, setSearchKey] = useState(headCells[0]?.id);

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

    const getPackageData = async () => {
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
            const response = await getPackage(params);
            setLoading(false)
            setPackageData(response?.packages);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPackageData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'Plan Management' },
    ];

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={'Package List'}
                breadcrumbs={breadcrumbs}
                typography={'Package List'}
            />
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
                        butLable='Package'
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
                                {packageData?.length > 0 ? packageData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/plan-management/packagelist/${row?._id}`}>{row?.name}</Link></TableCell>
                                        <TableCell>{row?.price}</TableCell>
                                        <TableCell>{row?.onlinePayment ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>{row?.package_type}</TableCell>
                                        <TableCell>	{moment(row?.createdAt).format('MMMM Do, YYYY')}</TableCell>
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
            <AddPackage open={open} setOpen={setOpen} getPackageData={getPackageData} getPackageDetails={getPackageData} mode="add" />
        </>
    );
}