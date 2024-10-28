import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

export default function CustomAccordion() {
    const [expanded, setExpanded] = useState(false);
    const backgroundColor = useSelector((state) => state.customization.backgroundColor);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary
                sx={{ backgroundColor: backgroundColor }} // Change background color as needed
                expandIcon={
                    expanded ? (
                        <RemoveIcon sx={{ color: 'white' }} />
                    ) : (
                        <AddIcon sx={{ color: 'white' }} />
                    )
                }
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                    <Typography sx={{ fontSize: '1rem', color: '#FFF' }}>Direct SMS</Typography>
                    <Button sx={{ color: 'white', marginRight: '5px' }} variant='contained' >View All Alerts</Button>
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ height: '300px', display: 'flex', alignItems: 'end' }}>
                <TextField
                    id="price_subscriber"
                    label="Type Message"
                    fullWidth
                    name="price_subscriber"
                    type="text"
                    margin="normal"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ padding: 0 }}>
                                <Button>
                                    Send
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            paddingRight: 0, // Remove extra padding on the right side
                        }
                    }}
                />
            </AccordionDetails>
        </Accordion>
    );
}