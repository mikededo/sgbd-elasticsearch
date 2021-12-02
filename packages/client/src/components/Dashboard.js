import React, { useEffect, useState } from 'react';

import { COLUMNS, useAppContext } from '../util';
import DashboardHeader from './DashboardHeader';
import Table from './Table';

const Dashboard = () => {
  const {
    search: { loading, result, get },
    favourites: { loading: favLoading }
  } = useAppContext();

  const [pagination, setPagination] = useState({
    position: ['topRight', 'bottomRight'],
    pageSize: 50,
    current: 1,
    style: { marginRight: 24 },
    pageSizeOptions: [50, 100]
  });

  /**
   *
   * @param {import('antd').PaginationProps} changes
   */
  const handleOnTableChange = (changes) => {
    const { current, pageSize } = changes;

    setPagination((prev) => ({ ...prev, ...changes }));
    get((current - 1) * pageSize, pageSize);
  };

  useEffect(() => {
    get(0, pagination.pageSize, true).then((total) => {
      setPagination((prev) => ({ ...prev, total }));
    });
  }, []);

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
          dataSource={result}
          loading={loading || favLoading}
          pagination={pagination}
          onTableChange={handleOnTableChange}
        />
      </section>
    </main>
  );
};

export default Dashboard;
