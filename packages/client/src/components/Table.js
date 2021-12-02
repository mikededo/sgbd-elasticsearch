import React from 'react';

import { Table as AntdTable } from 'antd';

import { dataParser } from '../util';

const Table = ({
  columns,
  dataSource,
  loading,
  pagination,
  onTableChange
}) => (
  <AntdTable
    columns={columns}
    dataSource={dataSource.map(dataParser)}
    loading={loading}
    pagination={pagination}
    rowKey={(record) => record.id}
    onChange={onTableChange}
    scroll={{ x: 1500 }}
    bordered
    sticky
  />
);

export default Table;
