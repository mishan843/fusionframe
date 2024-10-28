// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { AuthWrapper1, BackgroundVideo } from '../AuthWrapper1';
import AuthLogin from '../authentication/auth-forms/AuthLogin';
import logo from '../../../assets/images/logo-icon.png'
import logotext from '../../../assets/images/logo-text.png'
import { Link } from 'react-router-dom';
import backgroundVideo from '../../../assets/images/loginvideo.mp4';
import { Box, Divider, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import login1 from '../../../assets/images/auth/login1.png'
import login2 from '../../../assets/images/auth/login2.png'
import login3 from '../../../assets/images/auth/login3.png'
import login4 from '../../../assets/images/auth/login4.png'
import login5 from '../../../assets/images/auth/login5.png'
import { Autoplay } from 'swiper/modules';
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const images = [
    { src: login1, alt: "Slide 1" },
    { src: login2, alt: "Slide 2" },
    { src: login3, alt: "Slide 3" },
    { src: login4, alt: "Slide 4" },
    { src: login5, alt: "Slide 5" }
  ];

  return (
    <>
      <AuthWrapper1>
        <BackgroundVideo autoPlay muted loop style={{ filter: 'brightness(0.5)' }}>
          <source src={backgroundVideo} type="video/mp4" />
        </BackgroundVideo>
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper sx={{ width: '80%', height: '80vh', boxShadow: 24, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Grid container sx={{ height: '100%' }}>
              <Grid item xs={12} lg={6} display={'flex'} height={'100%'} justifyContent={'center'} flexDirection={'column'} gap={4} p={5} pb={5}>
                <Link to="#" aria-label="logo" className='mt-3'>
                  <img src={logo} alt="" style={{ height: '60px', width: '60px', marginRight: '10px' }} />
                  <img src={logotext} alt="" style={{ height: '40px', width: '170px' }} />
                </Link>
                <Stack spacing={2} display={'flex'} justifyContent={'space-center'} mt={2}>
                  <Box>
                    <Typography color="#555c5f" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                      Hi, Welcome
                    </Typography>
                    <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }} color={'#555c5f'}>
                      Enter your credentials to continue
                    </Typography>
                  </Box>
                  <AuthLogin />
                </Stack>
              </Grid>
              <Divider />
              <Grid item lg={6} md={6} display={{ lg: 'flex', xs: 'none' }} justifyContent={'center'} alignItems={'center'} height={'100%'} p={3}>
                <Swiper
                  className="mySwiper h-100 w-100"
                  style={{ borderRadius: '10px' }}
                  autoplay={{ delay: 2000 }}
                  loop={true}
                  modules={[Autoplay]}
                >
                  {images?.map((item, index) => (
                    <SwiperSlide key={index} ><img src={item?.src} className='h-100 w-100 object-fit-contained' alt={item?.alt} /></SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </AuthWrapper1>
    </>
  );
};

export default Login;