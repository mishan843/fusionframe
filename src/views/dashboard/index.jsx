import { useEffect, useState } from 'react';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import HomeData from './section1';
import SubscriberTable from './SubscriberTable';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <BreadcrumbsCommon
        heading={'Dashboard'}
        breadcrumbs={breadcrumbs}
        typography={'Dashboard'}
      />
      <HomeData />
      <SubscriberTable />
    </>
  );
};

export default Dashboard;