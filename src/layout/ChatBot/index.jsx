import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ChatIcon from '@mui/icons-material/Chat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InitialOptions from './InitialOptions';
import { Box } from '@mui/system';
import ChatbotComponent from './ChatBoat';

const ChatBoat = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
    if (!open) {
      setShowOptions(true);
    }
  };

  const handleOptionSelect = (option) => {
    if (option === 'chat') {
      setShowOptions(false);
      setOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: '14%',
          right: 10,
          zIndex: '10000'
        }}
      >
        {open && (
          <>
            {!showOptions ? (
              <ChatbotComponent setShowOptions={setShowOptions} setOpen={setOpen} />
            ) : (
              <InitialOptions onSelect={handleOptionSelect} />
            )}
          </>
        )}
      </Box>

      <Tooltip title={open ? "Close Chat" : "Open Chat"}>
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="primary"
          sx={{
            borderRadius: '50%',
            bottom: '5%',
            position: 'fixed',
            right: 65,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton>
            <IconButton color="inherit" size="large" disableRipple>
              {open ? <KeyboardArrowDownIcon /> : <ChatIcon />}
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>
    </>
  );
};

export default ChatBoat;