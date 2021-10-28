import React from 'react';

import { Space, Table, Typography } from 'antd';

import { RoundedInput } from './common';
import { COLUMNS, dataParser } from '../util';
import { MOCK_DATA } from '../../mock';

const { Title } = Typography;

const FinderContent = () => (
  <main
    className="site-layout-content"
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '4px'
    }}
  >
    <Space style={{ width: '100%' }} direction="vertical">
      <section style={{ padding: '24px 24px 0' }}>
        <Title level={3}>
          Search for the talents of the upcoming generation!
        </Title>

        <RoundedInput placeholder="Start searching players" size="large" />
      </section>

      <section style={{ height: '100%' }}>
        <Table
          columns={COLUMNS}
          dataSource={MOCK_DATA.map(dataParser)}
          pagination={{
            position: ['topRight', 'bottomRight'],
            pageSize: 25,
            style: { marginRight: '24px' }
          }}
          scroll={{ x: 1500 }}
          bordered
          sticky
        />
      </section>
    </Space>
  </main>
);

export default FinderContent;
