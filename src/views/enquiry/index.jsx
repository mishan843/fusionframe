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
import moment from 'moment';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';
import { getEnquiry } from 'services/EnquiryService';
import AddEnquiry from './AddEnquiry';

const headCells = [
    { id: 'companyName', numeric: false, disablePadding: false, label: 'Company Name' },
    { id: 'personName', numeric: false, disablePadding: false, label: 'Person Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: true, disablePadding: false, label: 'Mobile no' },
    { id: 'message', numeric: false, disablePadding: false, label: 'Message' },
    { id: 'gstNo', numeric: false, disablePadding: false, label: 'GST no' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
];

export default function EnquiryList() {
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
                search: [`${searchTerm}`],
                sort: [``],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            const response = await getEnquiry(params);
            setLoading(false)
            setPackageData(response?.enquiries);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPackageData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'Enquiry' },
    ];

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={'Enquiry List'}
                breadcrumbs={breadcrumbs}
                typography={'Enquiry List'}
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
                        butLable='Enquiry'
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
                                        <TableCell>{row?.companyName}</TableCell>
                                        <TableCell>{row?.personName}</TableCell>
                                        <TableCell>{row?.email}</TableCell>
                                        <TableCell>{row?.phone}</TableCell>
                                        <TableCell>{row?.message}</TableCell>
                                        <TableCell>{row?.gstNo}</TableCell>
                                        <TableCell>	{moment(row?.createdAt).format('MMMM Do, YYYY')}</TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={7}>No Data Found</TableCell>
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
            <AddEnquiry open={open} setOpen={setOpen} getPackageData={getPackageData} getPackageDetails={getPackageData} mode="add" />
        </>
    );
}