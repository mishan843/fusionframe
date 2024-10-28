import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import ForgotPassword from 'views/pages/forgotpassword/ForgotPassword';
import ResetPassword from 'views/pages/resetpassword/ResetPassword';

const AuthLogin3 = Loadable(lazy(() => import('../views/pages/authentication/Login')));

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/auth/login',
      element: <AuthLogin3 />,
    },
    {
      path: '/reseller/login',
      element: <AuthLogin3 />,
    },
    {
      path: '/auth/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/auth/reset-password/:userId',
      element: <ResetPassword />,
    },
  ],
};

export default AuthenticationRoutes;