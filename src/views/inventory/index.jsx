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
import moment from 'moment';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';
import AddInventory from './AddInventory';
import { deleteInventory, getInventories, getInventoryDetail } from 'services/InventoryService';
import { FaRegEdit } from 'react-icons/fa';
import { LuEye } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Button } from '@mui/material';
import DeleteModal from 'views/modal/DeleteModal';
import ViewList from './ViewList';

const headCells = [
    { id: 'plan', numeric: false, disablePadding: false, label: 'Plan' },
    { id: 'user', numeric: false, disablePadding: false, label: 'User' },
    { id: 'deviceType', numeric: false, disablePadding: false, label: 'Device Type' },
    { id: 'model', numeric: true, disablePadding: false, label: 'Model' },
    { id: 'serialNo', numeric: false, disablePadding: false, label: 'Serial No' },
    { id: 'installDate', numeric: false, disablePadding: false, label: 'Installation Date' },
    { id: 'warranty', numeric: false, disablePadding: false, label: 'Warranty' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: 'Created Date' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

export default function InventoryList() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [packageData, setPackageData] = useState([]);
    const [inventoryDetail, setInventoryDetail] = useState();
    const [inventoryDetailData, setInventoryDetailData] = useState();
    const [inventoryId, setInventoryId] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleOpen = () => {
        setMode('add');
        setInventoryDetail({plan: "", user: "", deviceType: "", model : "", serialNo: "", warranty: "", deviceInstallationDate: inventoryDetail?.deviceInstallationDate || moment().format('YYYY-MM-DD')});
        setOpen(true);
    };

    const [searchKey, setSearchKey] = useState(headCells[0]?.id);
    const [mode, setMode] = useState('');

    const handleEdit = async (id) => {
        setMode('edit');
        setOpen(true);
        await getInventoryData(id);
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

    const getPackageData = async () => {
        try {
            setLoading(true)
            const params = {
                search: [`${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            const response = await getInventories(params);
            setLoading(false)
            setPackageData(response?.inventories);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPackageData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const getInventoryData = async (id) => {
        try {
            setLoading(true)
            const params = {
                id: id
            };
            const response = await getInventoryDetail(params);
            setLoading(false)
            setInventoryDetail(response?.data);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnDelete = async () => {
        try {
            setLoading(true)
            const params = {
                id: inventoryId
            }
            await deleteInventory(params);
            getPackageData()
            handleClose()
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => {
        setOpenDelete(false)
    }

    const breadcrumbs = [
        { label: 'Inventory' },
    ];

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={'Inventory List'}
                breadcrumbs={breadcrumbs}
                typography={'Inventory List'}
            />
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
                        butLable='Inventory'
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
                                {packageData?.length > 0 ? packageData?.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row?.planDetail.planName}</TableCell>
                                        <TableCell>{row?.userDetail.userName}</TableCell>
                                        <TableCell>{row?.deviceType}</TableCell>
                                        <TableCell>{row?.model}</TableCell>
                                        <TableCell>{row?.serialNo}</TableCell>
                                        <TableCell>{row?.deviceInstallationDate}</TableCell>
                                        <TableCell>{row?.warranty}</TableCell>
                                        <TableCell>	{moment(row?.createdAt).format('MMMM Do, YYYY')}</TableCell>
                                        <TableCell>
                                            <Box display={'flex'} gap={1}>
                                                <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }} onClick={() => handleEdit(row._id)} >
                                                    <FaRegEdit />
                                                </Button>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    sx={{ height: '32px', minWidth: '30px', fontSize: '1.6rem' }}
                                                    onClick={() => {
                                                        setOpenList(true); // Opens the modal
                                                        setInventoryDetailData(row); // Set the selected row's data for the modal
                                                    }}
                                                >
                                                    <LuEye />
                                                </Button>
                                                <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.6rem' }} onClick={() => { setOpenDelete(true); setInventoryId(row?._id) }} >
                                                    <RiDeleteBin5Line />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell className='text-center' colSpan={4}>No Data Found</TableCell>
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
            <AddInventory open={open} setOpen={setOpen} inventoryDetail={inventoryDetail} getPackageData={getPackageData} getPackageDetails={getPackageData} mode={mode} setMode={setMode} />
            <ViewList openList={openList} setOpenList={setOpenList} inventoryDetailData={inventoryDetailData} />
            <DeleteModal
                open={openDelete}
                handleClose={handleClose}
                message="Inventory"
                handleOnDelete={handleOnDelete}
            />
        </>
    );
}