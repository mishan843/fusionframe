// components/CustomToolbar.js
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';
import SearchSelect from 'views/search/SearchSelect';
import AddIcon from '@mui/icons-material/Add';

const CustomToolbar = ({
    searchTerm,
    setSearchTerm,
    numSelected,
    handleOpen,
    searchKey,
    setSearchKey,
    actions,
    options,
    butLable
}) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            <Grid container spacing={1} display={'flex'} alignItems="center" justifyContent={'space-between'}>
                <Grid item xs={12} sm={4}>
                    <Box display={'flex'} gap={2}>
                        {searchKey && (
                            <SearchSelect options={options} setSearchKey={setSearchKey} searchKey={searchKey} setSearchTerm={setSearchTerm} />
                        )}
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size='small'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} display={'flex'} justifyContent={'flex-end'} pr={1}>
                    {handleOpen && (
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                            Add {butLable}
                        </Button>
                    )}
                    {actions && (
                        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ ml: 2 }}>
                            {actions.map((action, index) => (
                                <Button key={index} onClick={action.onClick}>
                                    {action.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    )}
                </Grid>
            </Grid>
        </Toolbar>
    );
};

CustomToolbar.propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    numSelected: PropTypes.number,
    handleOpen: PropTypes.func,
    searchKey: PropTypes.string,
    setSearchKey: PropTypes.func,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        })
    )
};

export default CustomToolbar;
