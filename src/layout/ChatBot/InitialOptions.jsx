import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import AddTicket from 'views/tickets/AddTicket';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const InitialOptions = ({ onSelect }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+917982832976'; 
    const message = encodeURIComponent('Hello, I need assistance.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    onSelect('create-ticket');
  };

  return (
    <>
      <Box sx={{ width: '275px', height: '500px', backgroundColor: '#FFF', boxShadow: 15, display: 'flex', alignItems: 'end', flexDirection: 'column', justifyContent: 'end', borderRadius: '10px' }}>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={2} padding={2}>
          <Button endIcon={<SendIcon sx={{ color: 'primary.main' }} />} variant="text" sx={{ color: 'gray', borderColor: 'gray', justifyContent: 'space-between', boxShadow: 4, padding: 1.5 }} color="primary" onClick={() => onSelect('chat')}>
            Chat with Us
          </Button>
          <Box boxShadow={4}>
            <Typography px={1.5} pt={1.5}>Create Ticket</Typography>
            <Button endIcon={<MailOutlineIcon sx={{ color: 'primary.main' }} />} variant="text" sx={{ color: 'gray', borderColor: 'gray', width: '100%', justifyContent: 'space-between', padding: 1.5 }} onClick={() => handleOpenModal()}>
              Support
            </Button>
          </Box>
          <Box boxShadow={4}>
            <Typography px={1.5} pt={1.5}>Knowledge Base</Typography>
            <TextField
              variant="outlined"
              placeholder="Search for articles..."
              size="small"
              fullWidth
              sx={{ padding: 1.5 }}
              InputProps={{
                sx: { paddingRight: 0 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                        borderTopRightRadius: '11px',
                        borderBottomRightRadius: '11px',
                        backgroundColor: 'primary.main',
                        color: '#FFF',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: '#FFF'
                        }
                      }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button endIcon={<WhatsAppIcon sx={{ color: 'primary.main' }} />} variant="text" sx={{ color: 'gray', borderColor: 'gray', justifyContent: 'space-between', boxShadow: 4, padding: 1.5 }} color="primary" onClick={handleWhatsAppClick}>
            Message us on WhatsApp
          </Button>
          <Box boxShadow={4} padding={1.5} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <CheckCircleIcon sx={{ color: 'green' }} />
            <Box>
              <Typography sx={{ fontSize: '12px' }}>Status: All Systems Operational</Typography>
              <Typography sx={{ fontSize: '12px', color: 'gray', borderColor: 'gray', justifyContent: 'space-between' }} onClick={() => { setOpenModal(true); onSelect('create-ticket'); }}>
                Updated Nov 7, UTC
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box width={'100%'} display={'flex'} justifyContent='space-around' boxShadow={5} borderRadius={2}>
          <Button sx={{ display: 'flex', flexDirection: 'column' }}>
            <HomeIcon />
            Home
          </Button>
          <Button sx={{ display: 'flex', flexDirection: 'column' }}>
            <MessageIcon />
            Message
          </Button>
        </Box>
      </Box >
      <AddTicket open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default InitialOptions;