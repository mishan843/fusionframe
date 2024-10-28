import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { getResellerDetail } from 'services/ResellerService';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const EmployeeAssociation = ({ resellerID, setLoading }) => {
    const { userId } = useParams()
    const [employeeData, setEmployeeData] = useState([])
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    const getEmployeeData = async () => {
        try {
            const params = {
                id: userId ? userId : resellerID
            }
            setLoading(true)
            const response = await getResellerDetail(params);
            setEmployeeData(response?.data?.employees);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getEmployeeData()
    }, [])

    const headers = [
        'Customer Name',
        'Status',
        'Name',
        'User Name',
        'Password',
        'Mobile Number',
        'Email',
    ];

    return (
        <Box >
            <TableContainer sx={{ border: `1px solid ${backgroundColor} !important` }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: backgroundColor }}>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell sx={{ color: '#FFF' }}>{header}</TableCell>
                            ))}
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
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan={7} className='text-center'>Data Not Found</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default EmployeeAssociation;