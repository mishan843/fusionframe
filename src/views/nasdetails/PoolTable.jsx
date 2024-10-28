import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIPPool } from 'services/IPPoolAddress';
import { MenuItem, Select } from '@mui/material';
import AddIPPool from './AddIPPool';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'poolName', numeric: false, disablePadding: false, label: 'Pool Name' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'networkIp', numeric: false, disablePadding: false, label: 'Network IP' },
    { id: 'broadcastIp', numeric: false, disablePadding: false, label: 'Broadcast IP' },
    { id: 'totalHost', numeric: false, disablePadding: false, label: 'Total Host' },
];

function EnhancedTableToolbar({ tagIPPool, setTagIPPool }) {
    return (
        <Toolbar
            sx={{ paddingLeft: '0 !important' }}
        >
            <Select
                size="small"
                name='country'
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                        },
                    },
                }}
                sx={{ minWidth: '150px' }}
                value={tagIPPool}
                onChange={(e) => { setTagIPPool(e.target.value); }}
            >
                <MenuItem value={'private'}>Private</MenuItem>
                <MenuItem value={'public'}>Public</MenuItem>
            </Select>
        </Toolbar>
    );
}

export default function PoolTable({ setOpen, open, setLoading }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [ipPoolData, setIPPoolData] = useState([])
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);
    const [tagIPPool, setTagIPPool] = useState('private')
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
    const getIPPoolData = async () => {
        try {
            const params = {
                tagIpPool: tagIPPool,
                nasId: userId,
                skip: page * rowsPerPage,
                limit: rowsPerPage
            }
            setLoading(true)
            const response = await getIPPool(params);
            setIPPoolData(response?.ipPools);
            setTotalRows(response?.total)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getIPPoolData();
    }, [tagIPPool, page, rowsPerPage, order, orderBy,]);

    return (
        <>
            <Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        tagIPPool={tagIPPool}
                        setTagIPPool={setTagIPPool}
                    />
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
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/nas-management/naslist/ip-list/${row?._id}`}>{row?.poolName}</Link></TableCell>
                                        <TableCell>{row?.status}</TableCell>
                                        <TableCell>{row?.networkIp}</TableCell>
                                        <TableCell>{row?.broadcastIp}</TableCell>
                                        <TableCell>{row?.totalHost}</TableCell>
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
            <AddIPPool open={open} setOpen={setOpen} getIPPoolData={getIPPoolData} />
        </>
    );
}