import { Table } from 'antd';
import React from 'react';
import { MOCK_DATA } from '../../mock';
import { COLUMNS, dataParser } from '../util';

const DashboardTable = () => (
  <Table
    columns={COLUMNS}
    dataSource={MOCK_DATA.map(dataParser)}
    pagination={{
      position: ['topRight', 'bottomRight'],
      pageSize: 25,
      style: { marginRight: 24 }
    }}
    scroll={{ x: 1500 }}
    bordered
    sticky
  />
);

export default DashboardTable;
