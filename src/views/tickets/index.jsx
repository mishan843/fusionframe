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
import { useState, useEffect } from 'react';
import { ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import AddTicket from './AddTicket';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CircleLoader from 'ui-component/cards/CircleLoader';
import { getTicket } from 'services/ticketService';

const headCells = [
    // { id: 'ticket', numeric: false, disablePadding: false, label: 'Ticket' },
    // { id: 'personCalled', numeric: false, disablePadding: false, label: 'Person Called' },
    { id: 'subject', numeric: false, disablePadding: false, label: 'Subject' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },

    { id: 'subscriber', numeric: true, disablePadding: false, label: 'Subscriber' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
    // { id: 'zone', numeric: false, disablePadding: false, label: 'Zone' },
    { id: 'assignedTo', numeric: false, disablePadding: false, label: 'Assigned to' },
    { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'dueby', numeric: false, disablePadding: false, label: 'Due By' },
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
                <Grid item xs={12} sm={10} display={'flex'} justifyContent={'flex-end'} pr={1}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                        Add Ticket
                    </Button>
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
    handleOpen: PropTypes.func.isRequired,
};

export default function Tickets() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [ticketData, setTicketData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const getTicketData = async () => {
        try {
            const params = {
                search: [``],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            setLoading(true)
            const response = await getTicket(params);
            setLoading(false)
            setTicketData(response?.tickets);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getTicketData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'Support' },
    ];
    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={'Ticketing System'}
                breadcrumbs={breadcrumbs}
                typography={'Ticketing System'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CustomToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        actions={actions}
                        options={headCells}
                        butLable='Ticket'
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
                                {
                                    ticketData && ticketData?.length > 0 ? (
                                        ticketData?.map((ticket, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{ticket?.subject}</TableCell>
                                                <TableCell>{ticket?.status}</TableCell>
                                                <TableCell>{ticket?.subscriber?.subscriberName}</TableCell>
                                                <TableCell>{ticket?.category?.categoryName}</TableCell>
                                                <TableCell>{ticket?.assignedTo?.assignedName}</TableCell>
                                                <TableCell>{ticket?.priority}</TableCell>
                                                <TableCell>{formatDate(ticket?.createdAt)}</TableCell>
                                                <TableCell>{formatDate(ticket?.dueBy)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                                No tickets available
                                            </TableCell>
                                        </TableRow>
                                    )
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
            <AddTicket
                open={open}
                setOpen={setOpen}
                getTicketData={getTicketData}
                setLoading={setLoading}
            />
        </>
    );
}