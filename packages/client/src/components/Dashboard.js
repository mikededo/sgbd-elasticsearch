import React from 'react';

import DashboardHeader from './DashboardHeader';
import DashboardTable from './DashboardTable';

const Dashboard = () => (
  <main
    className="site-layout-content"
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '4px'
    }}
  >
    <DashboardHeader />

    <section style={{ height: '100%' }}>
      <DashboardTable />
    </section>
  </main>
);

export default Dashboard;
