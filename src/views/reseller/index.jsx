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
import {Chip } from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { Link, useNavigate } from 'react-router-dom';
import { deleteReseller, getReseller } from 'services/ResellerService';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
  { id: 'resellerName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
  { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' }
];

export default function Reseller() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [resellerData, setResellerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [resellerID, setResellerID] = useState('');
  const [searchKey, setSearchKey] = useState(headCells[0]?.id);

  const navigate = useNavigate()
  const handleOpen = () => navigate('/network-partners/reseller/new-reseller');

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

  const getResellerData = async () => {
    try {
      const params = {
        search: [`${searchKey},${searchTerm}`],
        skip: page * rowsPerPage,
        limit: rowsPerPage
      };

      if (orderBy && order) {
        params.sort = `${orderBy},${order}`;
      }
      setLoading(true)
      const response = await getReseller(params);
      setResellerData(response?.resellers);
      setTotalRows(response?.total);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getResellerData();
  }, [page, rowsPerPage, searchTerm, order, orderBy, searchKey]);

  const breadcrumbs = [
    { label: 'Network Partners' },
  ];

  const handleOnDelete = async () => {
    try {
      const params = {
        id: resellerID
      }
      setLoading(true)
      await deleteReseller(params);
      getResellerData()
      setOpen(false)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const actions = [
    { label: 'Excel', onClick: () => console.log('Excel clicked') },
    { label: 'Print', onClick: () => console.log('Print clicked') }
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'Reseller Management'}
        breadcrumbs={breadcrumbs}
        typography={'Reseller Management'}
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
            butLable='Reseller'
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
                {resellerData?.length > 0 ? resellerData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell><Link style={{ textDecoration: 'none' }} to={`/network-partners/reseller/details/${row?._id}`}>{row?.resellerName}</Link></TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.mobile}</TableCell>
                    <TableCell>{row?.country}</TableCell>
                    <TableCell>
                      <Chip label={row?.status === 'active' ? 'Active' : 'InActive'} color={row?.status === 'active' ? 'success' : 'error'} variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box display={'flex'} gap={1}>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }} onClick={() => navigate(`/network-partners/reseller/${row?._id}`)}>
                          <FaRegEdit />
                        </Button>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.5rem' }} onClick={() => { setOpen(true); setResellerID(row?._id) }}>
                          <RiDeleteBin5Line />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell className='text-center' colSpan={6}>No Data Found</TableCell>
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
      <DeleteModal
        open={open}
        handleClose={handleClose}
        message="Reseller"
        handleOnDelete={handleOnDelete}
      />
    </>
  );
}