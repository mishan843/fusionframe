import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
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
import { ButtonGroup, FormControlLabel, IconButton, List, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { deleteSubscribers, getSubscriber } from 'services/SubscribersService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchSelect from 'views/search/SearchSelect';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleLoader from 'ui-component/cards/CircleLoader';
import { useContext } from 'react';
import { Context } from 'usecontext/ContextProvider';
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
    const { numSelected, searchTerm, setSearchTerm, searchKey, setSearchKey, handleOnDelete, handleClickMenu, handleCheckboxChange, handleClose, checkedItems, anchorEl } = props;
    const navigate = useNavigate()

    const handleOpen = () => navigate('/user-management/subscribers/new-subscriber');

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
                        <Grid item xs={6} sm={2}>
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
                        <Grid item xs={12} sm={12} md={6}>
                            <Box display={'flex'} gap={2}>
                                <SearchSelect options={checkedItems.filter((item) => item?.value)} setSearchKey={setSearchKey} searchKey={searchKey} setSearchTerm={setSearchTerm} />
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
                    )}
                    {numSelected > 0 ? (
                        <Grid item xs={6} sm={10} textAlign={'end'}>
                            <Tooltip title="Delete">
                                <IconButton onClick={handleOnDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={12} textAlign={'end'} md={6}>
                            <Box display={'flex'} gap={{ lg: 2, xs: 1 }} justifyContent={'end'}>
                                <Button
                                    aria-controls="checkbox-menu"
                                    aria-haspopup="true"
                                    onClick={handleClickMenu}
                                    variant="contained"
                                    sx={{ padding: 0, minWidth: '40px' }}
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
                                <Button variant="contained" sx={{ px: { md: 2, xs: 1 } }} startIcon={<AddIcon />} onClick={handleOpen}>
                                    Add Subscriber
                                </Button>
                                <ButtonGroup variant="contained" aria-label="Basic button group" >
                                    <Button sx={{ px: { md: 2, xs: 1 } }}>Excel</Button>
                                    <Button sx={{ px: { md: 2, xs: 1 } }}>Print</Button>
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
    const [subscriberData, setSubscriberData] = useState([]);
    const [order, setOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const userdata = localStorage.getItem('userdata')
    const userId = JSON.parse(userdata)?._id
    const { role } = useContext(Context);
    const [checkedItems, setCheckedItems] = useState([
        { id: 'name', label: 'Name', value: true },
        { id: 'accountNo', label: 'Account No', value: false },
        { id: 'billingAddress', label: 'Billing Address', value: false },
        { id: 'userName', label: 'User Name', value: true },
        { id: 'installationAddress', label: 'Installation Address', value: false },
        { id: 'email', label: 'Email', value: false },
        { id: 'city', label: 'City', value: false },
        { id: 'tate', label: 'State', value: false },
        { id: 'country', label: 'Country', value: false },
        { id: 'zipCode', label: 'Zip Code', value: false },
        { id: 'phone', label: 'Phone', value: false },
        { id: 'phone2', label: 'Phone2', value: false },
        { id: 'mobile', label: 'Mobile', value: true },
        { id: 'mobile2', label: 'Mobile2', value: false },
        { id: 'ubscriberType', label: 'Subscriber Type', value: false },
        { id: 'allowDevices', label: 'Allow Devices', value: false },
        { id: 'discount', label: 'Discount', value: false },
        { id: 'aadharNo', label: 'Aadhar No', value: false },
        { id: 'gstNo', label: 'Gst No', value: false },
        { id: 'note', label: 'Note', value: false },
        { id: 'package', label: 'Package', value: true },
    ]);

    const [searchKey, setSearchKey] = useState(checkedItems[0]?.id);

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
                search: [`${searchKey},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };
            if (role === 'reseller' && userId) {
                params.resellerId = userId;
            }
            else if (role === 'lco' && userId) {
                params.lcoId = userId;
            }

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            setLoading(true)
            const response = await getSubscriber(params);
            setSubscriberData(response?.subscribers);
            setTotalRows(response?.total);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSubscribersData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'User Management', link: '/' },
    ];

    const handleOnDelete = async () => {
        try {
            setLoading(true)
            await deleteSubscribers({
                ids: selected
            });
            setSelected([])
            getSubscribersData()
            setLoading(false)
        } catch (error) {
            console.error(error);
            setSelected([])
        }
    }

    return (
        <>
            {loading && <CircleLoader />}

            <BreadcrumbsCommon
                heading={'Subscribers'}
                breadcrumbs={breadcrumbs}
                typography={'Subscribers'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        searchTerm={searchTerm}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                        setSearchTerm={setSearchTerm}
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
                                            {checkedItems.filter((item) => item.value).map((checkedItem) => (
                                                <TableCell key={checkedItem.id}>
                                                    {checkedItem.id === 'name' || checkedItem.id === 'userName' ?
                                                        <Link style={{ textDecoration: 'none' }} to={`/user-management/subscribers/${row?._id}`}>{row[checkedItem.id]}</Link>
                                                        : row[checkedItem.id]
                                                    }
                                                </TableCell>
                                            ))}
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
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