import React, { useState } from 'react';

import { Table as AntdTable } from 'antd';

import { dataParser } from '../util';

const Table = ({ columns, dataSource, loading }) => {
  const [pagination, setPagination] = useState(50);

  const handleOnPageSizeChange = ({ pageSize }) => {
    setPagination(pageSize);
  };

  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource.map(dataParser)}
      loading={loading}
      pagination={{
        position: ['topRight', 'bottomRight'],
        pageSize: pagination,
        style: { marginRight: 24 }
      }}
      onChange={handleOnPageSizeChange}
      scroll={{ x: 1500 }}
      bordered
      sticky
    />
  );
};

export default Table;
