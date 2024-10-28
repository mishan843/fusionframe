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
import { deleteLCO, getLCO } from 'services/LCOService';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';
import { useContext } from 'react';
import { Context } from 'usecontext/ContextProvider';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';

const headCells = [
  { id: 'lcoName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile Number' },
  { id: 'district', numeric: false, disablePadding: false, label: 'City' },
  { id: 'lcoBalance', numeric: false, disablePadding: false, label: 'Total Balance' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Actions' },
];

export default function LCO() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [lcoData, setLCOData] = useState([]);
  const [lcoID, setLCOID] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(headCells[0]?.id);
  const userdata = localStorage.getItem('userdata')
  const userId = JSON.parse(userdata)?._id
  const { role } = useContext(Context);

  const navigate = useNavigate()
  const handleOpen = () => navigate('/network-partners/lco/new-lco');

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

  const getLCOData = async () => {
    try {
      const params = {
        search: [`${searchKey},${searchTerm}`],
        skip: page * rowsPerPage,
        limit: rowsPerPage
      };
      if (role === 'reseller' && userId) {
        params.resellerId = userId;
      }
      if (orderBy && order) {
        params.sort = `${orderBy},${order}`;
      }
      setLoading(true)
      const response = await getLCO(params);
      setLCOData(response?.Lcos);
      setTotalRows(response?.total);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLCOData();
  }, [page, rowsPerPage, searchTerm, order, orderBy, searchKey]);

  const breadcrumbs = [
    { label: 'Network Partners' },
  ];

  const handleOnDelete = async () => {
    try {
      const params = {
        id: lcoID
      }
      setLoading(true)
      await deleteLCO(params);
      setOpen(false)
      getLCOData()
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
        heading={'LCO Management'}
        breadcrumbs={breadcrumbs}
        typography={'LCO Management'}
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
            butLable='LCO'
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
                {lcoData?.length > 0 ? lcoData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell><Link style={{ textDecoration: 'none' }} to={`/network-partners/lco/details/${row?._id}`}>{row?.lcoName}</Link></TableCell>
                    <TableCell>{row?.mobile}</TableCell>
                    <TableCell>{row?.district}</TableCell>
                    <TableCell>{row?.lcoBalance}</TableCell>
                    <TableCell>
                      <Box display={'flex'} gap={1}>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }} onClick={() => navigate(`/network-partners/lco/${row?._id}`)}>
                          <FaRegEdit />
                        </Button>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.5rem' }} onClick={() => { setOpen(true); setLCOID(row?._id) }}>
                          <RiDeleteBin5Line />
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell className='text-center' colSpan={5}>No Data Found</TableCell>
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
        message="LCO"
        handleOnDelete={handleOnDelete}
      />
    </>
  );
}