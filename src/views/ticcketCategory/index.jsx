import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import Pagination from 'views/commoncomponent/Pagination';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CircleLoader from 'ui-component/cards/CircleLoader';
import { deleteTicketCategory, getTicketCategories } from 'services/TicketCategoryService';
import AddTicketCategory from './AddTicketCategory';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button } from '@mui/material';
import DeleteModal from 'views/modal/DeleteModal';

const TicketCategory = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryDetail, setCategoryDetail] = useState(null);

    const headCells = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'forReseller', numeric: false, disablePadding: false, label: 'For Reseller' },
        { id: 'forLco', numeric: false, disablePadding: false, label: 'For LCO' },
        { id: 'forEmployee', numeric: false, disablePadding: false, label: 'For Employee' },
        { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
        { id: 'action', numeric: false, disablePadding: false, label: 'Actions' }
    ];

    const handleOpen = () => {
        setCategoryDetail(null); // Clear category detail when adding a new category
        setOpen(true);
    };

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

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleOnDelete = async () => {
        try {
            setLoading(true);
            const params = {
                id: categoryId
            };
            await deleteTicketCategory(params);
            getTicketData();
            setOpenDelete(false);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getTicketData = async () => {
        try {
            const params = {
                search: [`${'name'},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            setLoading(true);
            const response = await getTicketCategories(params);
            setLoading(false);
            setCategoryData(response?.categories);
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

    const handleEditCategory = (category) => {
        setCategoryDetail(category); // Pass the category data to modal
        setOpen(true); // Open modal
    };

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={'Ticket Categories'}
                breadcrumbs={breadcrumbs}
                typography={'Ticket Categories'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CustomToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        actions={actions}
                        options={headCells}
                        butLable='category'
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
                                    categoryData?.length > 0 ? categoryData?.map((category, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.status}</TableCell>
                                            <TableCell>{category.forReseller ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{category.forLco ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{category.forEmployee ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{formatDate(category.createdAt)}</TableCell>
                                            <TableCell>
                                                <Box display={'flex'} gap={1}>
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }}
                                                        onClick={() => handleEditCategory(category)} // Call edit handler
                                                    >
                                                        <FaRegEdit />
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.6rem' }}
                                                        onClick={() => { setOpenDelete(true); setCategoryId(category?._id) }}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                        <TableRow>
                                            <TableCell className='text-center' colSpan={7}>Data Not Found</TableCell>
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
            <AddTicketCategory
                open={open}
                setOpen={setOpen}
                getTicketData={getTicketData}
                setLoading={setLoading}
                categoryDetail={categoryDetail} // Pass category details for editing
            />
            <DeleteModal
                open={openDelete}
                handleClose={handleDeleteClose}
                message="ticket category"
                handleOnDelete={handleOnDelete}
            />
        </>
    );
};

export default TicketCategory;
