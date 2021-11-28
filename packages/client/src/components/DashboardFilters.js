import React from 'react';

import { Button, Col, Row, Slider, Tag, Typography } from 'antd';

import {
  COUNTRY_FLAGS,
  KEEPER_TRAITS,
  PLAYER_TRAITS,
  POSITIONS
} from '../util';
import FiltersSelect from './FiltersSelect';

const { Title } = Typography;

const DashboardFilters = ({
  filters,
  handleOnSliderChange,
  handleOnSelectChange
}) => (
  <Row gutter={[32, 16]}>
    <Col span={24}>
      <Title level={4} style={{ marginBottom: 0 }}>
        Player personal data
      </Title>
    </Col>

    <Col span={8}>
      <Title level={5}>Player age</Title>

      <Slider
        min={14}
        max={20}
        marks={{
          14: '14',
          20: '20',
          [filters.age.start]: `${filters.age.start}`,
          [filters.age.end]: `${filters.age.end}`
        }}
        defaultValue={[14, 20]}
        tooltipPlacement="bottom"
        onAfterChange={handleOnSliderChange('age')}
        range
      />
    </Col>

    <Col span={8}>
      <Title level={5}>Player weight</Title>

      <Slider
        min={65}
        max={90}
        marks={{
          65: '65kg',
          90: '90kg',
          [filters.weight.start]: `${filters.weight.start}m`,
          [filters.weight.end]: `${filters.weight.end}m`
        }}
        defaultValue={[65, 90]}
        tooltipPlacement="bottom"
        onAfterChange={handleOnSliderChange('weight')}
        tipFormatter={(value) => (
          <Typography style={{ color: 'white' }}>{`${value}kg`}</Typography>
        )}
        range
      />
    </Col>

    <Col span={8}>
      <Title level={5}>Player height</Title>

      <Slider
        min={1.8}
        max={2.1}
        marks={{
          1.8: '1.8m',
          2.1: '2.1m',
          [filters.height.start]: `${filters.height.start}m`,
          [filters.height.end]: `${filters.height.end}m`
        }}
        defaultValue={[1.8, 2.1]}
        step={0.01}
        tooltipPlacement="bottom"
        onAfterChange={handleOnSliderChange('height')}
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
        values={Object.entries(POSITIONS).map(([key, { l }]) => [key, l])}
        onChange={handleOnSelectChange('positions')}
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
        onChange={handleOnSelectChange('countries')}
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
        onChange={handleOnSelectChange('strongFoots')}
      />
    </Col>

    <Col span={16}>
      <FiltersSelect
        label="Player traits"
        placeholder="Sprinter, physical..."
        values={[
          ...Object.entries(PLAYER_TRAITS).map((tuple) => tuple),
          ...Object.entries(KEEPER_TRAITS).map(([key, value]) => [
            key,
            `(GK) ${value}`
          ])
        ]}
        onChange={handleOnSelectChange('traits')}
      />
    </Col>

    {/* Spacers */}
    <Col span={8} />
    <Col flex="auto" />

    <Col flex="none">
      <Button
        type="primary"
        htmlType="submit"
        style={{ alignSelf: 'flex-end' }}
      >
        Apply filters
      </Button>
    </Col>
  </Row>
);

export default DashboardFilters;
