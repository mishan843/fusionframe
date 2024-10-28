import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { MdDone } from "react-icons/md";

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY, THEME_CHANGE, DARK_THEME } from 'store/actions';
import { gridSpacing } from 'store/constant';

// assets
import { IconSettings } from '@tabler/icons-react';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  // drawer on/off
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius
  const [borderRadius, setBorderRadius] = useState(customization.borderRadius);
  const [selectedLight, setSelectedLight] = useState('#67757c');
  const [selectedDark, setSelectedDark] = useState(null);
  const [isDark, setIsDark] = useState(false);

  const itemsLight = [
    { justifyContent: 'end', backgroundColor: '#67757c' },
    { justifyContent: 'center', backgroundColor: '#26dad2' },
    { justifyContent: 'tart', backgroundColor: '#ef5350' },
    { justifyContent: 'end', backgroundColor: '#1976d2' },
    { justifyContent: 'center', backgroundColor: '#7460ee' },
    { justifyContent: 'tart', backgroundColor: '#00897b' },
  ];

  const itemsDark = [
    { justifyContent: 'end', backgroundColor: '#67757c' },
    { justifyContent: 'center', backgroundColor: '#26dad2' },
    { justifyContent: 'tart', backgroundColor: '#ef5350' },
    { justifyContent: 'end', backgroundColor: '#1976d2' },
    { justifyContent: 'center', backgroundColor: '#7460ee' },
    { justifyContent: 'tart', backgroundColor: '#00897b' },
  ];

  useEffect(() => {
    if (selectedLight !== null) {
      setSelectedDark(null);
      setIsDark(false);
    }
  }, [selectedLight])

  useEffect(() => {
    if (selectedDark !== null) {
      setSelectedLight(null);
      setIsDark(true);
    }
  }, [selectedDark])

  useEffect(() => {
    dispatch({
      type: THEME_CHANGE,
      backgroundColor: isDark ? selectedDark : selectedLight
    });
    dispatch({ type: DARK_THEME, themeDark: isDark });
  }, [dispatch, selectedLight, selectedDark])

  useEffect(() => {
    dispatch({ type: SET_BORDER_RADIUS, borderRadius });
  }, [dispatch, borderRadius]);

  let initialFont;
  switch (customization.fontFamily) {
    case `'Inter', sans-serif`:
      initialFont = 'Inter';
      break;
    case `'Poppins', sans-serif`:
      initialFont = 'Poppins';
      break;
    case `'Roboto', sans-serif`:
    default:
      initialFont = 'Roboto';
      break;
  }

  // state - font family
  const [fontFamily, setFontFamily] = useState(initialFont);
  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case 'Inter':
        newFont = `'Inter', sans-serif`;
        break;
      case 'Poppins':
        newFont = `'Poppins', sans-serif`;
        break;
      case 'Roboto':
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
  }, [dispatch, fontFamily]);

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            bottom: '5%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280
          }
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              <SubCard title="With Light sidebar" contentSX={{ p: 0 }}>
                <Grid container pt={3}>
                  {itemsLight.map((item, index) => (
                    <Grid key={index} item display={'flex'} justifyContent={item.justifyContent} alignItems={'center'} xs={4} mb={'11px'}>
                      <div
                        style={{
                          height: '50px',
                          width: '50px',
                          backgroundColor: item.backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedLight(item.backgroundColor)}
                      >
                        {selectedLight === item.backgroundColor && <MdDone size={24} color="#fff" />}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </SubCard>
            </Grid>

            <Grid item xs={12}>
              <SubCard title="With Dark sidebar" contentSX={{ p: 0 }}>
                <Grid container pt={3}>
                  {itemsDark.map((item, index) => (
                    <Grid item key={index} display={'flex'} justifyContent={item.justifyContent} alignItems={'center'} xs={4} mb={'11px'}>
                      <div
                        style={{
                          height: '50px',
                          width: '50px',
                          backgroundColor: item.backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedDark(item.backgroundColor)}
                      >
                        <div style={{ height: '100%', width: '10px', backgroundColor: 'black' }}></div>
                        {selectedDark === item.backgroundColor && <MdDone size={24} color="#fff" style={{ marginLeft: '7px' }} />}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* font family */}
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Roboto"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        '& .MuiFormControlLabel-label': { color: theme.palette.grey[900] }
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* Support */}
              {/* <Grid item xs={12}>
                <SubCard title={titleSupport()} contentSX={{ p: 0 }}>
                  <Grid container pt={3}>
                    <div className='text-center'>
                      <Button variant="outlined" color="primary" sx={{ mb: 1, width: 200 }} onClick={() => setOpenModal(true)}>
                        Create Ticket
                      </Button>
                      <Button variant="outlined" color="primary" sx={{ width: 200 }}>
                        My Tickets
                      </Button>
                    </div>
                  </Grid>
                </SubCard>
              </Grid> */}
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;