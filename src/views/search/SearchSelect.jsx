import { MenuItem, Select } from '@mui/material'
import React from 'react'

const SearchSelect = ({ options, searchKey, setSearchKey, setSearchTerm }) => {
    return (
        <Select
            size="small"
            name='country'
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 200,
                        overflowY: 'auto',
                    },
                },
            }}
            sx={{ minWidth: '150px' }}
            value={searchKey}
            onChange={(e) => { setSearchKey(e.target.value); setSearchTerm('') }}
        >
            {options?.map((item, index) => (
                <MenuItem key={index} value={item?.id}>{item?.label}</MenuItem>
            ))}
        </Select>
    )
}

export default SearchSelect
