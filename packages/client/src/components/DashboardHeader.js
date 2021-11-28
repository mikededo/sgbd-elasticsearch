import React, { useEffect, useRef, useState } from 'react';

import { Button, Col, Input, Row, Typography } from 'antd';

import { FilterOutlined } from '@ant-design/icons';

import DashboardFilters from './DashboardFilters';

const { Title } = Typography;

const DashboardHeader = () => {
  const childRef = useRef(null);

  const [filtersHeight, setFiltersHeight] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    age: { start: 14, end: 20 },
    weight: { start: 65, end: 90 },
    height: { start: 1.8, end: 2.1 },
    positions: [],
    countries: [],
    strongFoots: [],
    traits: []
  });

  /**
   * @param {'age' | 'weight' | 'height'} prop
   */
  const handleOnSliderChange =
    (prop) =>
    ([start, end]) => {
      setFilters((prev) => ({ ...prev, [prop]: { start, end } }));
    };

  /**
   * @param {'poisitions' | 'countries' | 'strongFoots' | 'traits'} prop
   */
  const handleOnSelectChange = (prop) => (values) => {
    setFilters((prev) => ({ ...prev, [prop]: values }));
  };

  const handleOnFiltersClick = () => {
    setShowFilters((prev) => !prev);
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setFiltersHeight(childRef.current.clientHeight + 32);
  }, []);

  return (
    <form name="player-filters" onSubmit={handleOnFormSubmit}>
      <section style={{ padding: '24px 24px 12px' }}>
        <Title level={3}>
          Search for the talent of the upcoming generation!
        </Title>

        <Row align="middle" gutter={32}>
          <Col flex={1}>
            <Input placeholder="Start by searching players" size="large" />
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
            handleOnSliderChange={handleOnSliderChange}
            handleOnSelectChange={handleOnSelectChange}
          />
        </div>
      </section>
    </form>
  );
};

export default DashboardHeader;
