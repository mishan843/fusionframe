import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import { LuEye } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import ViewList from './ViewList';
import { deleteNAS, getNAS } from 'services/NASService';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'ipAddress', numeric: false, disablePadding: false, label: 'NAS IP Address' },
    { id: 'vendor', numeric: false, disablePadding: false, label: 'Vendor' },
    { id: 'sharedSecret', numeric: false, disablePadding: false, label: 'NAS Shared Secret' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created By' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Actions' }
];

export default function EnhancedTable() {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [nasData, setNASData] = useState([]);
    const [nasDetail, setNASDetail] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [nasID, setNASID] = useState('');
    const navigate = useNavigate()
    const [searchKey, setSearchKey] = useState(headCells[0]?.id);
    const handleOpen = () => navigate('/nas-management/naslist/new-nas');

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

    const getNASData = async () => {
        try {
            setLoading(true)
            const params = {
                search: [`${searchKey},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }

            const response = await getNAS(params);
            setNASData(response?.nases);
            setTotalRows(response?.total);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getNASData();
    }, [page, rowsPerPage, searchTerm, order, orderBy, searchKey]);

    const handleOnDelete = async () => {
        try {
            setLoading(true)
            const params = {
                id: nasID
            }
            await deleteNAS(params);
            getNASData()
            handleClose()
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const breadcrumbs = [{ label: 'NAS Management', link: '/' }];

    const handleClose = () => {
        setOpenDelete(false)
    }

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon heading={'NAS List'} breadcrumbs={breadcrumbs} typography={'NAS List'} />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CustomToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        searchKey={searchKey}
                        setSearchKey={setSearchKey}
                        actions={actions}
                        options={headCells}
                        butLable='NAS'
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
                                {nasData?.length > 0 ? nasData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Link style={{ textDecoration: 'none' }} to={`/nas-management/naslist/${row?._id}`}>{row?.name}</Link></TableCell>
                                        <TableCell>{row?.ipAddress}</TableCell>
                                        <TableCell>{row?.vendor}</TableCell>
                                        <TableCell>{row?.sharedSecret}</TableCell>
                                        <TableCell>{row?.createdByName}</TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={1}>
                                                <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }} onClick={() => navigate(`/nas-management/naslist/editnas/${row?._id}`)} >
                                                    <FaRegEdit />
                                                </Button>
                                                <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', fontSize: '1.6rem' }} onClick={() => { setOpen(true); setNASDetail(row) }} >
                                                    <LuEye />
                                                </Button>
                                                <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.6rem' }} onClick={() => { setOpenDelete(true); setNASID(row?._id) }} >
                                                    <RiDeleteBin5Line />
                                                </Button>
                                            </Box>
                                        </TableCell>
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
            <ViewList open={open} setOpen={setOpen} nasDetail={nasDetail} />
            <DeleteModal
                open={openDelete}
                handleClose={handleClose}
                message="NAS"
                handleOnDelete={handleOnDelete}
            />
        </>
    );
}