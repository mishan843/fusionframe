import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { getIPAddress } from 'services/IPPoolAddress';
import moment from 'moment';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'ip', numeric: false, disablePadding: false, label: 'IP' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'action', numeric: false, disablePadding: false, label: '' },
];

export default function IPPoolAddressTable({ subscriber, setLoading, selectPoolName, ipAddressData, setIPAddressData, setIpAddress, ipAddress }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

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

    const getIPAddressData = async () => {
        try {
            setLoading(true)
            const params = {
                poolId: selectPoolName,
                skip: page * rowsPerPage,
                limit: rowsPerPage,
                isAssigned: true,
            };

            if (subscriber?.ipAddress) {
                params.subscriberId = subscriber?._id
            }
            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            const response = await getIPAddress(params);
            setIPAddressData(response?.ipAddresses);
            setTotalRows(response?.total);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getIPAddressData();
    }, [page, rowsPerPage, order, orderBy, selectPoolName]);

    const handleCheckboxChange = (id) => {
        setIpAddress(id);
    };

    return (
        <>
            <Box>
                <Paper sx={{ width: '100%', mt: 2 }}>
                    <TableContainer sx={{ border: `1px solid ${backgroundColor}` }}>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'} >
                            <CommonTableHead
                                columns={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                backgroundColor={backgroundColor}
                            />
                            <TableBody >
                                {ipAddressData?.length > 0 ? ipAddressData?.map((row, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{row?.ip}</TableCell>
                                        <TableCell>{row?.status}</TableCell>
                                        <TableCell>{moment(row?.date).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>
                                            <Checkbox
                                                color="primary"
                                                checked={ipAddress === row._id}
                                                onChange={() => handleCheckboxChange(row._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={6}>Data Not Found</TableCell>
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
        </>
    );
}