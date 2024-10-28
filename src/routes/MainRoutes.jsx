import { Navigate } from 'react-router-dom';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthRoute from './AuthRoute';
import { lazy } from 'react';
import RoleRoute from './RoleRoute';
import TicketCategory from 'views/ticcketCategory';
import InvoiceList from 'views/invoicemanagement';
import DiscountList from 'views/discountandpro';
import EnquiryList from 'views/enquiry';
import KnowledgeBase from 'views/knowledgebase';
import InventoryList from 'views/inventory';
import AddInvoiceManagement from 'views/invoicemanagement/AddInvoiceManagement';
import EditInvoiceManagement from 'views/invoicemanagement/EditInvoiceManagement';
import ViewKnowledgeBase from 'views/knowledgebase/ViewKnowledgeBase';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const Reseller = Loadable(lazy(() => import('views/reseller')));
const LCO = Loadable(lazy(() => import('views/lco')));
const NewLCO = Loadable(lazy(() => import('views/newlco')));
const EditLCO = Loadable(lazy(() => import('views/newlco/EditLCO')));
const LCODetails = Loadable(lazy(() => import('views/lcodetails')));
const NewReseller = Loadable(lazy(() => import('views/newreseller')));
const EditReseller = Loadable(lazy(() => import('views/newreseller/EditReseller')));
const ResellerDetails = Loadable(lazy(() => import('views/resellerdetails')));
const InvoiceDetails = Loadable(lazy(() => import('views/invoicedetails')));
const AlertsNotification = Loadable(lazy(() => import('views/alertsnotifications')));
const SytemSettings = Loadable(lazy(() => import('views/systemsettings')));
const Subscribers = Loadable(lazy(() => import('views/subscribers')));
const NewSubscriber = Loadable(lazy(() => import('views/newsubscriber')));
const EditSubscriber = Loadable(lazy(() => import('views/newsubscriber/EditSubscriber')));
const BulkRenew = Loadable(lazy(() => import('views/bulkrenew')));
const BulkRenewHistory = Loadable(lazy(() => import('views/bulkrenewhistory')));
const Users = Loadable(lazy(() => import('views/users')));
const UserDetails = Loadable(lazy(() => import('views/userdetails')));
const SubscriberDetails = Loadable(lazy(() => import('views/subscriberdetails')));
const RoleManagement = Loadable(lazy(() => import('views/rolemanagement')));
const RoleDetails = Loadable(lazy(() => import('views/roledetails')));
const Tickets = Loadable(lazy(() => import('views/tickets')));
const PackageList = Loadable(lazy(() => import('views/packagelist')));
const PackageDetails = Loadable(lazy(() => import('views/packagedetails')));
const NASList = Loadable(lazy(() => import('views/nasList')));
const NewNAS = Loadable(lazy(() => import('views/newnas')));
const EditNAS = Loadable(lazy(() => import('views/newnas/EditNAS')));
const NASDetails = Loadable(lazy(() => import('views/nasdetails')));
const IPList = Loadable(lazy(() => import('views/iplist')));
const ProfileDetail = Loadable(lazy(() => import('views/profiledetails')));
const RealTimeStatistics = Loadable(lazy(() => import('views/realtimestatistics')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><Navigate to="/dashboard" replace /></RoleRoute></AuthRoute>,
    },
    {
      path: 'dashboard',
      element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><DashboardDefault /></RoleRoute></AuthRoute>,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'alerts-notification',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><AlertsNotification /></RoleRoute></AuthRoute>,
        },
        {
          path: 'realtime-statistics',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><RealTimeStatistics /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'network-partners',
      children: [
        {
          path: 'reseller',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><Reseller /></RoleRoute></AuthRoute>,
        },
        {
          path: 'reseller/new-reseller',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><NewReseller /></RoleRoute></AuthRoute>,
        },
        {
          path: 'reseller/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><EditReseller /></RoleRoute></AuthRoute>,
        },
        {
          path: 'reseller/details/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><ResellerDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'lco',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller']}><LCO /></RoleRoute></AuthRoute>,
        },
        {
          path: 'lco/new-lco',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller']}><NewLCO /></RoleRoute></AuthRoute>,
        },
        {
          path: 'lco/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller']}><EditLCO /></RoleRoute></AuthRoute>,
        },
        {
          path: 'lco/details/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><LCODetails /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'nas-management',
      children: [
        {
          path: 'naslist',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><NASList /></RoleRoute></AuthRoute>,
        },
        {
          path: 'naslist/new-nas',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><NewNAS /></RoleRoute></AuthRoute>,
        },
        {
          path: 'naslist/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><NASDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'naslist/editnas/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><EditNAS /></RoleRoute></AuthRoute>,
        },
        {
          path: '/nas-management/naslist/ip-list/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><IPList /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'user-management',
      children: [
        {
          path: 'subscribers',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><Subscribers /></RoleRoute></AuthRoute>,
        },
        {
          path: 'subscribers/new-subscriber',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><NewSubscriber /></RoleRoute></AuthRoute>,
        },
        {
          path: 'subscribers/edit-subscriber/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><EditSubscriber /></RoleRoute></AuthRoute>,
        },
        {
          path: 'subscribers/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><SubscriberDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'users',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><Users /></RoleRoute></AuthRoute>,
        },
        {
          path: 'users/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><UserDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'role-management',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><RoleManagement /></RoleRoute></AuthRoute>,
        },
        {
          path: 'role-management/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin']}><RoleDetails /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'plan-management',
      children: [
        {
          path: 'packagelist',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco']}><PackageList /></RoleRoute></AuthRoute>,
        },
        {
          path: 'packagelist/:userId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco']}><PackageDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'bulkrenew',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><BulkRenew /></RoleRoute></AuthRoute>,
        },
        {
          path: 'bulkrenew/bulkrenew-history',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><BulkRenewHistory /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'billing',
      children: [
        {
          path: 'invoice-management',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco']}><InvoiceList /></RoleRoute></AuthRoute>,
        },
        {
          path: 'invoice/add-invoice',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco']}><AddInvoiceManagement /></RoleRoute></AuthRoute>,
        },
        {
          path: 'invoice/details/:invoiceId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco', 'reseller']}><InvoiceDetails /></RoleRoute></AuthRoute>,
        },
        {
          path: 'invoice/:invoiceId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'lco']}><EditInvoiceManagement /></RoleRoute></AuthRoute>,
        },
        {
          path: 'discountandpro',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><DiscountList /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'support',
      children: [
        {
          path: 'tickets',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><Tickets /></RoleRoute></AuthRoute>,
        },
        {
          path: 'ticket-categories',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><TicketCategory /></RoleRoute></AuthRoute>,
        },
        {
          path: 'knowledge-base',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><KnowledgeBase /></RoleRoute></AuthRoute>,
        },
        {
          path: 'addarticles',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><KnowledgeBase /></RoleRoute></AuthRoute>,
        },
        {
          path: 'articles/:articleId',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><ViewKnowledgeBase /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'enquiry',
      children: [
        {
          path: 'enquirylist',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><EnquiryList /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'inventory',
      children: [
        {
          path: 'management',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><InventoryList /></RoleRoute></AuthRoute>,
        },
      ],
    },
    {
      path: 'profiledetail',
      element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><ProfileDetail /></RoleRoute></AuthRoute>
    },
    {
      path: 'settings',
      children: [
        {
          path: 'system-settings',
          element: <AuthRoute><RoleRoute allowedRoles={['admin', 'reseller', 'lco']}><SytemSettings /></RoleRoute></AuthRoute>,
        },
      ],
    },
  ],
};

export default MainRoutes;