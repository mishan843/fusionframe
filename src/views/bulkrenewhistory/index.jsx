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
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'batvj_no', numeric: false, disablePadding: false, label: 'Batch No' },
    { id: 'total', numeric: false, disablePadding: false, label: 'Total' },
    { id: 'success', numeric: true, disablePadding: false, label: 'Success' },
    { id: 'failed', numeric: false, disablePadding: false, label: 'Failed' },
    { id: 'mrp', numeric: false, disablePadding: false, label: 'MRP' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'recharge_renew_by', numeric: false, disablePadding: false, label: 'Recharge/Renew By' },
];

function EnhancedTableToolbar({ searchTerm, setSearchTerm, numSelected, handleOpen }) {
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
            </Grid>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    handleOpen: PropTypes.func.isRequired,
};

export default function BulkRenewHistory() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            // const params = {
            //     search: searchTerm,
            //     skip: page * rowsPerPage,
            //     limit: rowsPerPage
            // };

            // if (orderBy && order) {
            //     params.sort = `${orderBy},${order}`;
            // }

            // const response = await getUser(params);
            // setUserData(response?.users);
            // setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'Plan Management' },
        { label: 'Bulk Renew', link: '/plan-management/bulkrenew' },
    ];

    return (
        <>
            <BreadcrumbsCommon
                heading={'Bulk Renew History'}
                breadcrumbs={breadcrumbs}
                typography={'Bulk Renew History'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        numSelected={selected.length}
                        handleOpen={handleOpen}
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
                                <TableRow>
                                    <TableCell>IPNET_1GIG</TableCell>
                                    <TableCell>0.00</TableCell>
                                    <TableCell>0.00</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>6</TableCell>
                                    <TableCell>	June 27, 2024 12:59</TableCell>
                                    <TableCell>	1048576UL/1048576DL</TableCell>
                                </TableRow>
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