import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIPAddress, UpdateIPAddress } from 'services/IPPoolAddress';
import moment from 'moment';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'ip', numeric: false, disablePadding: false, label: 'IP' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'associateduser', numeric: false, disablePadding: false, label: 'Associated User' },
    { id: 'usable', numeric: false, disablePadding: false, label: 'Usable' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
];

function EnhancedTableToolbar({ searchTerm, setSearchTerm }) {
    return (
        <Toolbar
            sx={{ paddingLeft: '0 !important' }}
        >
            <TextField
                variant="outlined"
                placeholder="Search by IP Address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size='small'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
};

export default function PoolDetailsTable({ ipPoolDetail }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [ipAddressData, setIPAddressData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const getIPAddresData = async () => {
        try {
            const params = {
                poolId: ipPoolDetail?._id,
                search: searchTerm,
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            if (ipPoolDetail?._id) {
                const response = await getIPAddress(params);
                setIPAddressData(response?.ipAddresses);
                setTotalRows(response?.total);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getIPAddresData();
    }, [page, rowsPerPage, searchTerm, order, orderBy, ipPoolDetail]);

    const handleOnClick = async (ipAddressID, usable) => {
        try {
            const data = {
                poolId: ipPoolDetail?._id,
                ipId: ipAddressID,
                updates: {
                    usable: usable
                }
            };
            await UpdateIPAddress(data, true);
            getIPAddresData()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Box>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <TableContainer sx={{ border: `1px solid ${backgroundColor} !important` }}>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'} >
                            <CommonTableHead
                                columns={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                backgroundColor={backgroundColor}
                            />
                            <TableBody>
                                {ipAddressData?.length > 0 ? ipAddressData?.map((row, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{row?.ip}</TableCell>
                                        <TableCell>{row?.status}</TableCell>
                                        <TableCell>{row?.associatedUser ? row?.associatedUser : '-'}</TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={1}>
                                                <Button variant={row?.usable ? 'contained' : 'outlined'} sx={{
                                                    borderRadius: '20px',
                                                    color: "green",
                                                    cursor: row?.usable ? 'auto !important' : 'pointer',
                                                    backgroundColor: row?.usable ? '#DCFCE7' : '',
                                                    '&:hover': {
                                                        backgroundColor: row?.usable ? '#DCFCE7' : '#FFF',
                                                        borderColor: row.usable ? '' : 'green',
                                                    },
                                                    borderColor: row.usable ? '' : 'green'
                                                }}
                                                    onClick={() => row?.usable ? '' : handleOnClick(row?._id, true)}>Yes</Button>
                                                <Button
                                                    variant={!row?.usable ? 'contained' : 'outlined'}
                                                    sx={{
                                                        borderRadius: '20px',
                                                        cursor: !row?.usable ? 'auto !important' : 'pointer',
                                                        backgroundColor: !row?.usable ? '#F8C8CB' : '',
                                                        '&:hover': {
                                                            backgroundColor: !row?.usable ? '#F8C8CB' : '#FFF',
                                                            borderColor: '#f44336',
                                                        },
                                                        borderColor: !row.usable ? '' : '#f44336',
                                                        color: '#f44336'
                                                    }}
                                                    onClick={() => !row?.usable ? '' : handleOnClick(row?._id, false)}>No</Button>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{moment(row?.date).format('DD/MM/YYYY')}</TableCell>
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