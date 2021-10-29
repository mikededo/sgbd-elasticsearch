import React, { useEffect, useRef, useState } from 'react';

import { Button, Col, Input, Row, Slider, Tag, Typography } from 'antd';

import { FilterOutlined } from '@ant-design/icons';

import {
  COUNTRY_FLAGS,
  KEEPER_TRAITS,
  PLAYER_TRAITS,
  POSITIONS
} from '../util';
import FiltersSelect from './FiltersSelect';

const { Title } = Typography;

const DashboardHeader = () => {
  const childRef = useRef(null);

  const [filtersHeight, setFiltersHeight] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleOnFiltersClick = () => {
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    setFiltersHeight(childRef.current.clientHeight + 32);
  }, []);

  return (
    <>
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
          <Row gutter={[32, 16]}>
            <Col span={24}>
              <Title level={4} style={{ marginBottom: 0 }}>
                Player personal data
              </Title>
            </Col>

            <Col span={8}>
              <Title level={5}>Player weight</Title>

              <Slider
                min={65}
                max={90}
                marks={{ 65: '65kg', 90: '90kg' }}
                defaultValue={[65, 90]}
                tooltipPlacement="bottom"
                tipFormatter={(value) => (
                  <Typography
                    style={{ color: 'white' }}
                  >{`${value}kg`}</Typography>
                )}
                range
              />
            </Col>

            <Col span={8}>
              <Title level={5}>Player height</Title>

              <Slider
                min={1.8}
                max={2.1}
                marks={{ 1.8: '1.8m', 2.1: '2.1m' }}
                defaultValue={[1.8, 2.1]}
                step={0.01}
                tooltipPlacement="bottom"
                tipFormatter={(value) => (
                  <Typography style={{ color: 'white' }}>{`${value.toFixed(
                    2
                  )}m`}</Typography>
                )}
                range
              />
            </Col>

            <Col span={24}>
              <Title level={4} style={{ marginBottom: 0 }}>
                Player specifics
              </Title>
            </Col>

            <Col span={8}>
              <FiltersSelect
                label="Player position"
                placeholder="Goalkeeper, left back..."
                tagRender={({ value }) => <Tag>{POSITIONS[value].s}</Tag>}
                values={Object.entries(POSITIONS).map(([key, { l }]) => [
                  key,
                  l
                ])}
              />
            </Col>

            <Col span={8}>
              <FiltersSelect
                label="Player country"
                placeholder="Spain, Brazil..."
                tagRender={({ value }) => <Tag>{COUNTRY_FLAGS[value]}</Tag>}
                values={Object.entries(COUNTRY_FLAGS).map(([key, flag]) => [
                  key,
                  `${flag} ${key}`
                ])}
              />
            </Col>

            <Col span={8}>
              <FiltersSelect
                label="Player strong foot"
                placeholder="Left, right or both"
                values={[
                  ['right', 'Right'],
                  ['left', 'Left'],
                  ['both', 'Both']
                ]}
              />
            </Col>

            <Col span={8}>
              <FiltersSelect
                label="Player trait"
                placeholder="Sprinter, physical..."
                values={[
                  ...Object.entries(PLAYER_TRAITS).map((tuple) => tuple),
                  ...Object.entries(KEEPER_TRAITS).map(([key, value]) => [
                    key,
                    `(GK) ${value}`
                  ])
                ]}
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default DashboardHeader;
