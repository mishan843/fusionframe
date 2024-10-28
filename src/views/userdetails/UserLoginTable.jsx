import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { AppBar, ButtonGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getNewRequest } from 'services/AuthService';
import moment from 'moment';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'ip', numeric: false, disablePadding: false, label: 'IP' },
    { id: 'success', numeric: true, disablePadding: false, label: 'Success' },
    { id: 'user_agent', numeric: false, disablePadding: false, label: 'User Agent' },
];

function EnhancedTableToolbar({ searchTerm, setSearchTerm, numSelected }) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Grid container spacing={1} display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Grid item xs={12} sm={2}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
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
                </Grid>
                <Grid item xs={12} sm={10} display={'flex'} justifyContent={'flex-end'} pr={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ ml: 2 }}>
                        <Button>Excel</Button>
                        <Button>Print</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default function UserLoginTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [loginData, setLoginData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const getNewRequestData = async () => {
        try {
            const params = {
                search: searchTerm,
                skip: page * rowsPerPage,
                limit: rowsPerPage,
                userId: userId
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            const response = await getNewRequest(params);
            setLoginData(response?.activities);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNewRequestData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    return (
        <>
            <Box >
                <AppBar position="static" sx={{ backgroundColor: backgroundColor }}>
                    <Toolbar>
                        <Typography sx={{ fontSize: '1rem', flexGrow: 1 }}>User login history</Typography>
                    </Toolbar>
                </AppBar>
                <Paper sx={{ width: '100%', mb: 2, borderRadius: '0' }}>
                    <EnhancedTableToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        numSelected={selected.length}
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
                                {loginData?.length > 0 ? loginData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{moment(row?.createdAt).format('MMMM DD, YYYY HH:mm')}</TableCell>
                                        <TableCell>{row.ipAddress}</TableCell>
                                        <TableCell>{<Typography backgroundColor={`${row?.success ? 'green' : 'red'}`} height={'30px'} width={'50px'} color={'white'} borderRadius={8} display={'flex'} justifyContent={'center'} alignItems={'center'}>{row?.success ? 'Yes' : 'No'}</Typography>}</TableCell>
                                        <TableCell>{row.userAgent}</TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell colSpan={4} className='text-center'>No data available in table</TableCell>
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