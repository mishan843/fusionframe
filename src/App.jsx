import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import router from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from 'usecontext/ContextProvider';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <ContextProvider>
          <NavigationScroll>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="colored"
            />
          </NavigationScroll>
        </ContextProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;