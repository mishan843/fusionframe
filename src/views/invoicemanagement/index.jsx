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
import { Link, useNavigate } from 'react-router-dom';
import { deleteReseller } from 'services/ResellerService';
import DeleteModal from 'views/modal/DeleteModal';
import CircleLoader from 'ui-component/cards/CircleLoader';
import Pagination from 'views/commoncomponent/Pagination';
import CustomToolbar from 'views/commoncomponent/CustomToolbar';
import CommonTableHead from 'views/commoncomponent/CommonTableHead';
import { getInvoices } from 'services/BillingService';
import moment from 'moment'

const headCells = [
  { id: 'plan', numeric: false, disablePadding: false, label: 'Plan' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'invoiceNo', numeric: false, disablePadding: false, label: 'Invoice No' },
  { id: 'voucherNo', numeric: false, disablePadding: false, label: 'Voucher No' },
  { id: 'mode', numeric: false, disablePadding: false, label: 'Mode' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'remark', numeric: false, disablePadding: false, label: 'Remark' },
  { id: 'renewBy', numeric: false, disablePadding: false, label: 'Renew By' }
];

export default function Reseller() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [invoiceData, setInvoiceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [resellerID, setResellerID] = useState('');
  const [searchKey, setSearchKey] = useState(headCells[0]?.id);
  const [user, setUser] = useState(null);

    useEffect(() => {
        // Get the user data from localStorage
        const storedUserData = localStorage.getItem('userdata');
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));  // Parse and set user data
        }
    }, []);

  const navigate = useNavigate()
  const handleOpen = () => navigate('/billing/invoice/add-invoice');

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
        search: [``],
        skip: page * rowsPerPage,
        limit: rowsPerPage
      };

      if (orderBy && order) {
        params.sort = `${orderBy},${order}`;
      }
      setLoading(true)
      const response = await getInvoices(params);
      setInvoiceData(response?.invoices);
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
    { label: 'Billing' },
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
        heading={'Invoice Management'}
        breadcrumbs={breadcrumbs}
        typography={'Invoice Management'}
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
            butLable='Invoice'
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
                {invoiceData?.length > 0 ? invoiceData?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell><Link style={{ textDecoration: 'none' }} to={`/billing/invoice/details/${row?._id}`}>{row?.descOfGood.planName}</Link></TableCell>
                    <TableCell>{moment(row?.createdAt).format('MMMM Do, YYYY')}</TableCell>
                    <TableCell>{row?.total}</TableCell>
                    <TableCell>{row?.invoiceNo}</TableCell>
                    <TableCell>{row?.hsnsacCode}</TableCell>
                    <TableCell>{row?.creditTerms}</TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell>{row?.comment}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    {/* <TableCell>
                      <Chip label={row?.status === 'active' ? 'Active' : 'InActive'} color={row?.status === 'active' ? 'success' : 'error'} variant="outlined" />
                    </TableCell> */}
                    {/* <TableCell>
                      <Box display={'flex'} gap={1}>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#15803D', fontSize: '1.6rem' }} onClick={() => navigate(`/network-partners/reseller/${row?._id}`)}>
                          <FaRegEdit />
                        </Button>
                        <Button variant="text" size="small" sx={{ height: '32px', minWidth: '30px', color: '#E71D36', fontSize: '1.5rem' }} onClick={() => { setOpen(true); setResellerID(row?._id) }}>
                          <RiDeleteBin5Line />
                        </Button>
                      </Box>
                    </TableCell> */}
                  </TableRow>
                )) :
                  <TableRow>
                    <TableCell className='text-center' colSpan={6}>No Data Found</TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          {/* <InvoicePage/> */}
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
        message="Invoice"
        handleOnDelete={handleOnDelete}
      />
    </>
  );
}