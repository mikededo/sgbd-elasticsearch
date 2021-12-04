import React, { useEffect, useState } from 'react';

import { COLUMNS, INITIAL_FILTERS, useAppContext } from '../util';
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
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [prevSearch, setPrevSearch] = useState(null);

  const getHelper = (pageConfig, search = null) => {
    const { current, pageSize } = pageConfig;
    const searchValue = search ?? prevSearch;

    if (
      JSON.stringify(INITIAL_FILTERS) === JSON.stringify(filters) &&
      !searchValue
    ) {
      get({
        from: (current - 1) * pageSize,
        limit: pageSize,
        count: true
      }).then((total) => {
        setPrevSearch(null);
        setPagination((prev) => ({ ...prev, total }));
      });
    } else {
      get({
        from: (current - 1) * pageSize,
        limit: pageSize,
        filters: { ...filters, search: searchValue }
      }).then((total) => {
        setPrevSearch(search);
        setPagination((prev) => ({ ...prev, total }));
      });
    }
  };

  /**
   * @param {'age' | 'weight' | 'height'} prop
   */
  const handleOnSliderChange =
    (prop) =>
    ([start, end]) => {
      setFilters((prev) => ({ ...prev, [prop]: { start, end } }));
    };

  const handleOnSelectChange = (prop) => (values) => {
    setFilters((prev) => ({ ...prev, [prop]: values }));
  };

  const handleOnApplyFilters = (search) => {
    getHelper(pagination, search);
  };

  /**
   *
   * @param {import('antd').PaginationProps} changes
   */
  const handleOnTableChange = (changes) => {
    setPagination((prev) => ({ ...prev, ...changes }));
    getHelper(changes);
  };

  useEffect(() => {
    get({ from: 0, limit: pagination.pageSize, count: true }).then((total) => {
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
      <DashboardHeader
        filters={filters}
        onApplyFilters={handleOnApplyFilters}
        onSliderChange={handleOnSliderChange}
        onSelectChange={handleOnSelectChange}
      />

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
