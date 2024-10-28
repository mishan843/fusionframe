// components/CommonTableHead.js
import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const CommonTableHead = ({ columns, order, orderBy, onRequestSort, backgroundColor }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ backgroundColor: backgroundColor }}>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                            sx={backgroundColor && {
                                color: '#FFF',
                                '&:hover': {
                                    color: '#FFF',
                                },
                                '&:active': {
                                    color: '#FFF',
                                },
                                '&:focus': {
                                    color: '#FFF',
                                },
                                '&.Mui-active': {
                                    color: '#FFF',
                                },
                                '& .MuiTableSortLabel-icon': {
                                    color: '#FFF !important',
                                },
                            }}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

CommonTableHead.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

export default CommonTableHead;