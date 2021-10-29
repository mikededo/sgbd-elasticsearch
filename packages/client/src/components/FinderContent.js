import React from 'react';

import { Button, Col, Row, Space, Table, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

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

        <Row align="middle" gutter={32}>
          <Col flex={1}>
            <RoundedInput placeholder="Start searching players" size="large" />
          </Col>

          <Col>
            <Button size="large" icon={<FilterOutlined />}>
              Filters
            </Button>
          </Col>
        </Row>
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
