// components/Pagination.js
import React from 'react';
import TablePagination from '@mui/material/TablePagination';

const Pagination = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
    return (
        <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                m: 0,
                '& .MuiTablePagination-selectLabel': {
                    marginBottom: '0'
                },
                '& .MuiTablePagination-displayedRows': {
                    marginBottom: '0'
                }
            }}
        />
    );
};

export default Pagination;