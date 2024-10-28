import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSRCNAT } from 'services/SRCNATService';
import ConfigerIPNAT from './ConfigerIPNAT';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'privateIpPool', numeric: false, disablePadding: false, label: 'Private Ip Pool' },
    { id: 'publicIpPool', numeric: false, disablePadding: false, label: 'Public IP Pool' },
    { id: 'availablePrivateIps', numeric: false, disablePadding: false, label: 'Available Private Ips' },
    { id: 'availablePublicIps', numeric: false, disablePadding: false, label: 'Available Public Ips' },
    { id: 'ratio', numeric: false, disablePadding: false, label: 'Ratio' },
];

export default function ConfigureSRCNATTable({ setOpen, open, nasDetails, setLoading }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [ipPoolData, setIPPoolData] = useState([])
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const { userId } = useParams()

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

    const getSRCNATData = async () => {
        try {
            const params = {
                nasId: userId,
                skip: page * rowsPerPage,
                limit: rowsPerPage
            }
            setLoading(true)
            const response = await getSRCNAT(params);
            setIPPoolData(response?.users);
            setTotalRows(response?.total)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSRCNATData();
    }, [page, rowsPerPage, order, orderBy,]);

    return (
        <>
            <Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer sx={{ border: `1px solid ${backgroundColor} !important` }}>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle"  >
                            <CommonTableHead
                                columns={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                backgroundColor={backgroundColor}
                            />
                            <TableBody>
                                {ipPoolData?.length > 0 ? ipPoolData?.map((row, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{row?.privateIpPool}</TableCell>
                                        <TableCell>{row?.publicIpPool}</TableCell>
                                        <TableCell>{row?.availablePrivateIp}</TableCell>
                                        <TableCell>{row?.availablePublicIp}</TableCell>
                                        <TableCell>{row?.ratio}</TableCell>
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
            <ConfigerIPNAT setLoading={setLoading} open={open} setOpen={setOpen} nasDetails={nasDetails} getSRCNATData={getSRCNATData} />
        </>
    );
}