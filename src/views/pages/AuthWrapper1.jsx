// material-ui
import { styled } from '@mui/material/styles';

// project imports

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  // backgroundColor: '#EDEDED',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
}));

const BackgroundVideo = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
});

export { AuthWrapper1, BackgroundVideo };