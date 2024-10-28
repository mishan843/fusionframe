import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getSubscriber } from 'services/SubscribersService';
import SearchSelect from 'views/search/SearchSelect';
import Pagination from 'views/commoncomponent/Pagination';

const headCells = [
    {
        id: 'userName',
        numeric: true,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'customername',
        numeric: false,
        disablePadding: false,
        label: 'Customer Name',
    },
    {
        id: 'mobile',
        numeric: false,
        disablePadding: false,
        label: 'Mobile No',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'reseller',
        numeric: false,
        disablePadding: false,
        label: 'Reseller',
    },
    {
        id: 'lco',
        numeric: false,
        disablePadding: false,
        label: 'LCO',
    },
    {
        id: 'activationdate',
        numeric: false,
        disablePadding: false,
        label: 'Activation Date',
    },
    {
        id: 'expirydate',
        numeric: false,
        disablePadding: false,
        label: 'Expiry Date',
    },
    {
        id: 'planname',
        numeric: false,
        disablePadding: false,
        label: 'Plan Name',
    },
    {
        id: 'amount',
        numeric: false,
        disablePadding: false,
        label: 'Amount',
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        newPriceSelectedCount,
        rowCount,
        onRequestSort,
        onSelectAllClickNew
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox">
                    New price
                    <Checkbox
                        color="primary"
                        indeterminate={newPriceSelectedCount > 0 && newPriceSelectedCount < rowCount}
                        checked={rowCount > 0 && newPriceSelectedCount === rowCount}
                        onChange={onSelectAllClickNew}
                        inputProps={{
                            'aria-label': 'select all new prices',
                        }}
                    />
                </TableCell>
                <TableCell padding="checkbox">
                    Old price
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all old prices',
                        }}
                    />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    newPriceSelectedCount: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onSelectAllClickNew: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { handleOpen, searchTerm, setSearchTerm, searchKey, setSearchKey } = props;

    return (
        <>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <Box display={'flex'} gap={2}>
                            <SearchSelect options={headCells} setSearchKey={setSearchKey} searchKey={searchKey} />
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
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} textAlign={'end'}>
                        <Box display={'flex'} gap={2} justifyContent={'end'}>
                            <Button variant="contained" onClick={handleOpen}>
                                History
                            </Button>
                            <Button variant="contained">
                                Renew Now
                            </Button>
                            <Button variant="contained">
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [newPriceSelected, setNewPriceSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [bulkrenewData, setBulkrenewData] = useState([]);
    const navigate = useNavigate()
    const [totalRows, setTotalRows] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchKey, setSearchKey] = useState(headCells[0]?.id);

    const handleOpen = () => {
        navigate('/plan-management/bulkrenew/bulkrenew-history')
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = bulkrenewData?.map((n) => n?._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectAllClickNew = (event) => {
        if (event.target.checked) {
            const newSelecteds = bulkrenewData?.map((n) => n?._id);
            setNewPriceSelected(newSelecteds);
            return;
        }
        setNewPriceSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleClickNew = (event, name) => {
        const selectedIndex = newPriceSelected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(newPriceSelected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(newPriceSelected.slice(1));
        } else if (selectedIndex === newPriceSelected.length - 1) {
            newSelected = newSelected.concat(newPriceSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                newPriceSelected.slice(0, selectedIndex),
                newPriceSelected.slice(selectedIndex + 1)
            );
        }

        setNewPriceSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isNewPriceSelected = (name) => newPriceSelected.indexOf(name) !== -1;

    const breadcrumbs = [
        { label: 'Plan Management' },
    ];

    const getBulkRenewData = async () => {
        try {
            const params = {
                search: searchTerm,
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            const response = await getSubscriber(params);
            setBulkrenewData(response?.subscribers);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBulkRenewData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    return (

        <>
            <BreadcrumbsCommon
                heading={'Bulk Renew'}
                breadcrumbs={breadcrumbs}
                typography={'Bulk Renew'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                newPriceSelectedCount={newPriceSelected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onSelectAllClickNew={handleSelectAllClickNew}
                                onRequestSort={handleRequestSort}
                                rowCount={bulkrenewData.length}
                            />
                            <TableBody>
                                {bulkrenewData?.length > 0 ? bulkrenewData?.map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const isItemNewPriceSelected = isNewPriceSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell>{row?.userName}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>{row?.mobile}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemNewPriceSelected}
                                                    onClick={(event) => handleClickNew(event, row._id)}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={(event) => handleClick(event, row._id)}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                    :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={12}>No Data Found</TableCell>
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