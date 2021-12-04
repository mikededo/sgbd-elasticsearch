import React, { useEffect, useRef, useState } from 'react';

import { Button, Col, Form, Input, Row, Typography } from 'antd';

import { FilterOutlined } from '@ant-design/icons';

import DashboardFilters from './DashboardFilters';

const { Title } = Typography;

const DashboardHeader = ({
  filters,
  onApplyFilters,
  onSliderChange,
  onSelectChange
}) => {
  const childRef = useRef(null);

  const [filtersHeight, setFiltersHeight] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleOnFiltersClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleOnFormSubmit = ({ search }) => {
    onApplyFilters(search);
  };

  useEffect(() => {
    setFiltersHeight(childRef.current.clientHeight + 32);
  }, []);

  return (
    <Form name="player-filters" onFinish={handleOnFormSubmit}>
      <section style={{ padding: '24px 24px 12px' }}>
        <Title level={3}>
          Search for the talent of the upcoming generation!
        </Title>

        <Row align="middle" gutter={32}>
          <Col flex={1}>
            <Form.Item name="search" style={{ marginBottom: 0 }}>
              <Input placeholder="Start by searching players" size="large" />
            </Form.Item>
          </Col>

          <Col>
            <Button
              size="large"
              icon={<FilterOutlined />}
              onClick={handleOnFiltersClick}
            >
              Filters
            </Button>
          </Col>
        </Row>
      </section>

      <section
        style={{
          borderTop: '1px solid #f0f2f5',
          borderBottom: '1px solid #f0f2f5',
          borderWidth: showFilters ? 1 : 0,
          maxHeight: showFilters ? filtersHeight : 0,
          overflow: 'hidden',
          transition: 'all 0.25s ease-in-out',
          width: '100%'
        }}
      >
        <div ref={childRef} style={{ padding: '16px 24px' }}>
          <DashboardFilters
            filters={filters}
            onSliderChange={onSliderChange}
            onSelectChange={onSelectChange}
          />
        </div>
      </section>
    </Form>
  );
};

export default DashboardHeader;
