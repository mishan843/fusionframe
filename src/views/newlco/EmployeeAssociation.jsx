import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Employee from './Employee';
import { deleteLCOEMP, getLCODetail } from 'services/LCOService';
import { useSelector } from 'react-redux';

const EmployeeAssociation = ({ lcoID, setLoading }) => {
    const [open, setOpen] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [mode, setMode] = useState('');
    const { userId } = useParams()
    const [employeeData, setEmployeeData] = useState([])
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    const handleEdit = (row) => {
        setMode('edit')
        setOpen(true)
        setEmployee(row)
    };

    const getEmployeeData = async () => {
        try {
            const params = {
                id: userId ? userId : lcoID
            }
            setLoading(true)
            const response = await getLCODetail(params);
            setEmployeeData(response?.data?.employees);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (empId) => {
        try {
            const params = {
                lcoID: userId,
                employeeId: empId,
            }
            setLoading(true)
            await deleteLCOEMP(params);
            getEmployeeData()
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEmployeeData()
    }, [])

    return (
        <Box >
            <Box display={'flex'} justifyContent={'space-between'} p={2}>
                <h3>Employee Association</h3>
                <Button variant="contained" type="submit" size="small" sx={{ height: '38px', width: '80px' }} onClick={() => { setOpen(true); setMode('add'); }}>
                    Add
                </Button>
            </Box>

            <TableContainer sx={{ border: `1px solid ${backgroundColor} !important` }} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: backgroundColor }}>
                        <TableRow>
                            <TableCell sx={{ color: '#FFF' }}>Customer Name</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Status</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Name</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>User Name</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Password</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Mobile Number</TableCell>
                            <TableCell sx={{ color: '#FFF' }}>Email</TableCell>
                            <TableCell sx={{ color: '#FFF' }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            employeeData?.length > 0 ? employeeData?.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row?.name}
                                    </TableCell>
                                    <TableCell>{row?.status}</TableCell>
                                    <TableCell>{row?.name}</TableCell>
                                    <TableCell>{row?.userName}</TableCell>
                                    <TableCell>{row?.password}</TableCell>
                                    <TableCell>{row?.mobile}</TableCell>
                                    <TableCell>{row?.email}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => handleEdit(row)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => handleDelete(row?._id)}>
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan={7} className='text-center'>Data Not Found</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Employee open={open} setOpen={setOpen} lcoID={lcoID} getEmployeeData={getEmployeeData} mode={mode} employee={employee} setEmployee={setEmployee} />
        </Box>
    );
};

export default EmployeeAssociation;