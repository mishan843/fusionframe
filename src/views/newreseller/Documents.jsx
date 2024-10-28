import React from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    TextField,
    Button,
    Paper,
} from '@mui/material';

const Documents = () => {
    return (
        <Paper
            sx={{
                border: '1px solid #ccc',
                padding: 2,
                borderRadius: '4px',
                marginTop: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Documents
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Select
                    sx={{ width: '200px' }}
                    defaultValue=" "
                    size='small'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                >
                    <MenuItem value=" ">Select document</MenuItem>
                    <MenuItem value="ms">Ms</MenuItem>
                    <MenuItem value="ms-1">Ms 1</MenuItem>
                    <MenuItem value="ms-2">Ms 2</MenuItem>
                </Select>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        fullWidth
                        size='small'
                        label="Choose file to upload"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button
                        sx={{
                            marginLeft: 1,
                            backgroundColor: '#e0e0e0',
                            color: '#333',
                            width:'250px',
                            '&:hover': {
                                backgroundColor: '#ddd',
                            },
                        }}
                    >
                        Browse File
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default Documents;