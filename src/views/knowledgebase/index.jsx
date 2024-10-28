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
import AddKnowledgeBase from './AddKnowledgeBase';
import { MenuItem, Select, Typography } from '@mui/material';
import { CiStar } from "react-icons/ci";
import { CgFileDocument } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { getKnowledgeBase } from 'services/KnowledgeBaseService';

const KnowledgeBase = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [knowledgeData, setKnowledgeData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const headCells = [
        // { id: 'name', numeric: false, disablePadding: false, label: '' },
        // { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        // { id: 'forReseller', numeric: false, disablePadding: false, label: 'For Reseller' },
        // { id: 'forLco', numeric: false, disablePadding: false, label: 'For LCO' },
        // { id: 'forEmployee', numeric: false, disablePadding: false, label: 'For Employee' },
        // { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
        // { id: 'action', numeric: false, disablePadding: false, label: 'Actions' }
    ];

    const handleOpen = () => {
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

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getKnowledgeBaseData = async () => {
        try {
            const params = {
                search: [`${'title'},${searchTerm}`],
                skip: page * rowsPerPage,
                limit: rowsPerPage
            };

            if (orderBy && order) {
                params.sort = `${orderBy},${order}`;
            }
            setLoading(true);
            const response = await getKnowledgeBase(params);
            setLoading(false);
            setKnowledgeData(response?.knowledges);
            setTotalRows(response?.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getKnowledgeBaseData();
    }, [page, rowsPerPage, searchTerm, order, orderBy]);

    const breadcrumbs = [
        { label: 'Support' },
    ];

    const actions = [
        { label: 'Excel', onClick: () => console.log('Excel clicked') },
        { label: 'Print', onClick: () => console.log('Print clicked') }
    ];

    return (
        <>
            {loading && <CircleLoader />}
            <BreadcrumbsCommon
                heading={
                    <div className='display-flex align-items-center justify-content-center'>
                        <CiStar style={{ marginRight: '8px', paddingBottom: '5px' }} className='fs-3' />
                        Most Popular Articles
                    </div>}
                breadcrumbs={breadcrumbs}
                typography={'Most Popular Articles'}
            />
            <Box m={2}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <CustomToolbar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleOpen={handleOpen}
                        actions={actions}
                        options={headCells}
                        butLable='articles'
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
                                    knowledgeData?.length > 0 ? knowledgeData?.map((category, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/support/articles/${category._id}`)} // Make the row clickable
                                        >
                                            <TableCell colSpan={7} sx={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                                                <Box display="flex" alignItems="flex-start">
                                                    <CgFileDocument style={{ marginRight: '8px', fontSize: '1.5rem', color: 'gray', marginTop: "3px" }} />
                                                    <Box flex="1">
                                                        <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: '400', color: 'black' }} >
                                                            {category.title}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                                            {category.subTitle}
                                                        </Typography>
                                                    </Box>
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
            <AddKnowledgeBase
                open={open}
                getKnowledgeBaseData={getKnowledgeBaseData}
                handleClose={handleClose}
            />
        </>
    );
};

export default KnowledgeBase;
