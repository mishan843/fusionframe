import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { ButtonGroup, FormControl, FormControlLabel, IconButton, InputLabel, List, ListItemText, Menu, MenuItem, Select, TableRow, Tooltip, Typography } from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { deleteSubscribers } from 'services/SubscribersService';
import SettingsIcon from '@mui/icons-material/Settings';
import Pagination from 'views/commoncomponent/Pagination';

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        checkedItems
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {checkedItems.filter((item) => item?.value)?.map((checkedItems) => (
                    <TableCell
                        key={checkedItems.id}
                        padding={checkedItems.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === checkedItems.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === checkedItems.id}
                            direction={orderBy === checkedItems.id ? order : 'asc'}
                            onClick={createSortHandler(checkedItems.id)}
                        >
                            {checkedItems.label}
                            {orderBy === checkedItems.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected, handleOnDelete, handleClickMenu, handleCheckboxChange, handleClose, checkedItems, anchorEl } = props;

    return (
        <>
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
                <Grid container spacing={1} alignItems="center">
                    {numSelected > 0 ? (
                        <Grid item xs={12} sm={2}>
                            <Typography
                                sx={{ flex: '1 1 100%' }}
                                color="inherit"
                                variant="subtitle1"
                                component="div"
                            >
                                {numSelected} selected
                            </Typography>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={4}>
                            <Box display={'flex'} gap={2}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label" size="small">
                                        Reseller
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        name='reseller'
                                        label='Reseller'
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                        sx={{ minWidth: '150px' }}
                                    >
                                        <MenuItem value={'ALl'}>ALl</MenuItem>
                                        <MenuItem value={'Reseller1'}>Reseller1</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label" size="small">
                                        LCO
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        name='lco'
                                        label='LCO'
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                        sx={{ minWidth: '150px' }}
                                    >
                                        <MenuItem value={'ALl'}>ALl</MenuItem>
                                        <MenuItem value={'LCO1'}>LCO1</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label" size="small">
                                        Status
                                    </InputLabel>
                                    <Select
                                        size="small"
                                        name='status'
                                        label='Status'
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200,
                                                    overflowY: 'auto',
                                                },
                                            },
                                        }}
                                        sx={{ minWidth: '150px' }}
                                    >
                                        <MenuItem value={'active'}>Active</MenuItem>
                                        <MenuItem value={'inactive'}>In Active</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    )}
                    {numSelected > 0 ? (
                        <Grid item xs={12} sm={10} textAlign={'end'}>
                            <Tooltip title="Delete">
                                <IconButton onClick={handleOnDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={8} textAlign={'end'}>
                            <Box display={'flex'} gap={2} justifyContent={'end'}>
                                <Button
                                    aria-controls="checkbox-menu"
                                    aria-haspopup="true"
                                    onClick={handleClickMenu}
                                    variant="contained"
                                >
                                    <SettingsIcon />
                                </Button>
                                <Menu
                                    id="checkbox-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            overflowY: 'hidden',
                                            borderRadius: '5px'
                                        },
                                    }}
                                >
                                    <Box>
                                        <List style={{ maxHeight: '250px', overflow: 'auto' }}>
                                            {checkedItems?.map((item, index) => (
                                                <MenuItem key={index}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={item?.value}
                                                                onChange={() => handleCheckboxChange(item.id)}
                                                                name={item?.label}
                                                                sx={{ paddingBottom: 0, paddingTop: 0 }}
                                                            />
                                                        }
                                                        label={<ListItemText primary={item?.label} />}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </List>
                                    </Box>
                                </Menu>
                                <ButtonGroup variant="contained" aria-label="Basic button group" >
                                    <Button>Excel</Button>
                                    <Button>Print</Button>
                                </ButtonGroup>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [subscriberData, setSubscriberData] = useState([
        {
            _id: 1,
            userName: 'John Doe',
            framedIp: '192.168.1.1',
            ipv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
            macId: '00:11:22:33:44:55',
            nasPortId: '12345',
            authType: 'Password',
            callStart: '2022-01-01 00:00:00',
            nasIp: '192.168.1.100',
            totalTime: '00:30:00',
            uploadData: '100 MB',
            downloadData: '500 MB',
        },
        {
            _id: 2,
            userName: 'Jane Doe',
            framedIp: '192.168.1.2',
            ipv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7335',
            macId: '00:11:22:33:44:56',
            nasPortId: '12346',
            authType: 'Certificate',
            callStart: '2022-01-02 00:00:00',
            nasIp: '192.168.1.101',
            totalTime: '01:00:00',
            uploadData: '200 MB',
            downloadData: '1 GB',
        },
        {
            _id: 3,
            userName: 'Bob Smith',
            framedIp: '192.168.1.3',
            ipv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7336',
            macId: '00:11:22:33:44:57',
            nasPortId: '12347',
            authType: 'Biometric',
            callStart: '2022-01-03 00:00:00',
            nasIp: '192.168.1.102',
            totalTime: '01:30:00',
            uploadData: '300 MB',
            downloadData: '1.5 GB',
        },
        {
            _id: 4,
            userName: 'Alice Johnson',
            framedIp: '192.168.1.4',
            ipv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7337',
            macId: '00:11:22:33:44:58',
            nasPortId: '12348',
            authType: 'Token',
            callStart: '2022-01-04 00:00:00',
            nasIp: '192.168.1.103',
            totalTime: '02:00:00',
            uploadData: '400 MB',
            downloadData: '2 GB',
        },
        {
            _id: 5,
            userName: 'Mike Brown',
            framedIp: '192.168.1.5',
            ipv6: '2001:0db8:85a3:0000:0000:8a2e:0370:7338',
            macId: '00:11:22:33:44:59',
            nasPortId: '12349',
            authType: 'Smart Card',
            callStart: '2022-01-05 00:00:00',
            nasIp: '192.168.1.104',
            totalTime: '02:30:00',
            uploadData: '500 MB',
            downloadData: '2.5 GB',
        },
    ]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [checkedItems, setCheckedItems] = useState([
        { id: 'userName', label: 'User Name', value: true },
        { id: 'framedIp', label: 'Framed IP', value: true },
        { id: 'ipv6', label: 'IPv6', value: true },
        { id: 'macId', label: 'MACID', value: true },
        { id: 'nasPortId', label: 'NAS Port Id', value: true },
        { id: 'authType', label: 'Auth Type', value: true },
        { id: 'callStart', label: 'Call Start', value: false },
        { id: 'nasIp', label: 'NAS IP', value: true },
        { id: 'totaltime', label: 'Total Time', value: true },
        { id: 'uploadData', label: 'Upload Data', value: true },
        { id: 'downloadData', label: 'Download Data', value: true },
        { id: 'orderbytime', label: 'Order by time(descending)', value: false },
    ]);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, value: !item.value } : item
            )
        );
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = subscriberData.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((item) => item !== id);
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const getSubscribersData = async () => {
        try {
            const params = {
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            // const response = await getSubscriber(params);
            // setSubscriberData(response?.subscribers);
            // setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSubscribersData();
    }, [page, rowsPerPage, order, orderBy]);

    const breadcrumbs = [
        { label: 'Dashboard' },
    ];

    const handleOnDelete = async () => {
        try {
            await deleteSubscribers({
                ids: selected
            });
            setSelected([])
            getSubscribersData()
        } catch (error) {
            console.error(error);
            setSelected([])
        }
    }

    return (
        <>
            <BreadcrumbsCommon
                heading={'Real-Time Statistics'}
                breadcrumbs={breadcrumbs}
                typography={'Real-Time Statistics'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        getSubscribersData={getSubscribersData}
                        handleOnDelete={handleOnDelete}
                        handleCheckboxChange={handleCheckboxChange}
                        handleClose={handleClose}
                        handleClickMenu={handleClickMenu}
                        checkedItems={checkedItems}
                        anchorEl={anchorEl}
                    />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={totalRows}
                                checkedItems={checkedItems}
                            />
                            <TableBody>
                                {subscriberData?.length > 0 ? subscriberData?.map((row, index) => {
                                    const isItemSelected = isSelected(row?._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            onClick={(event) => handleClick(event, row._id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {checkedItems.filter((item) => item.value).map((checkedItem) => (
                                                <TableCell key={checkedItem.id}>
                                                    {checkedItem.id === 'name' || checkedItem.id === 'userName' ?
                                                        row[checkedItem.id]
                                                        : row[checkedItem.id]
                                                    }
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                }) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={11}>No Data Found</TableCell>
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