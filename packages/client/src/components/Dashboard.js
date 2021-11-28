import React from 'react';

import { MOCK_DATA } from '../../mock';
import { COLUMNS, useAppContext } from '../util';
import DashboardHeader from './DashboardHeader';
import Table from './Table';

const Dashboard = () => {
  const {
    search: { loading },
    favourites: { loading: favLoading }
  } = useAppContext();

  return (
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
        <Table
          columns={COLUMNS()}
          dataSource={MOCK_DATA}
          loading={loading || favLoading}
        />
      </section>
    </main>
  );
};

export default Dashboard;
