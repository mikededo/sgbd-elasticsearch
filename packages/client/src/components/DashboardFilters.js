import React from 'react';

import { Button, Col, Row, Slider, Tag, Typography } from 'antd';

import {
  COUNTRY_FLAGS,
  INITIAL_FILTERS,
  KEEPER_TRAITS,
  PLAYER_TRAITS,
  POSITIONS
} from '../util';
import FiltersSelect from './FiltersSelect';

const { Title } = Typography;

const DashboardFilters = ({
  filters,
  onSliderChange,
  onSelectChange
}) => {
  const getTraits = () => [
    ...Object.entries(PLAYER_TRAITS).map((tuple) => tuple),
    ...Object.entries(KEEPER_TRAITS).map(([key, value]) => [
      key,
      `(GK) ${value}`
    ])
  ];

  const anyTraitDisabled = () => {
    const {
      firstStrongPoints: first,
      secondStrongPoints: second,
      thirdStrongPoints: third,
      fourthStrongPoints: fourth
    } = filters;

    return first.length + second.length + third.length + fourth.length !== 0;
  };

  return (
    <Row gutter={[32, 16]}>
      <Col span={24}>
        <Title level={4} style={{ marginBottom: 0 }}>
          Player personal data
        </Title>
      </Col>

      <Col span={6} sm={8} xs={12}>
        <Title level={5}>Player age</Title>

        <Slider
          min={INITIAL_FILTERS.age.start}
          max={INITIAL_FILTERS.age.end}
          marks={{
            [INITIAL_FILTERS.age.start]: `${INITIAL_FILTERS.age.start}`,
            [INITIAL_FILTERS.age.end]: `${INITIAL_FILTERS.age.end}`,
            [filters.age.start]: `${filters.age.start}`,
            [filters.age.end]: `${filters.age.end}`
          }}
          defaultValue={[INITIAL_FILTERS.age.start, INITIAL_FILTERS.age.end]}
          tooltipPlacement="bottom"
          onAfterChange={onSliderChange('age')}
          range
        />
      </Col>

      <Col span={6} sm={8} xs={12}>
        <Title level={5}>Player weight</Title>

        <Slider
          min={INITIAL_FILTERS.weight.start}
          max={INITIAL_FILTERS.weight.end}
          marks={{
            [INITIAL_FILTERS.weight.start]: `${INITIAL_FILTERS.weight.start}kg`,
            [INITIAL_FILTERS.weight.end]: `${INITIAL_FILTERS.weight.end}kg`,
            [filters.weight.start]: `${filters.weight.start}kg`,
            [filters.weight.end]: `${filters.weight.end}kg`
          }}
          defaultValue={[
            INITIAL_FILTERS.weight.start,
            INITIAL_FILTERS.weight.end
          ]}
          tooltipPlacement="bottom"
          onAfterChange={onSliderChange('weight')}
          tipFormatter={(value) => (
            <Typography style={{ color: 'white' }}>{`${value}kg`}</Typography>
          )}
          range
        />
      </Col>

      <Col span={6} sm={8} xs={12}>
        <Title level={5}>Player height</Title>

        <Slider
          min={INITIAL_FILTERS.height.start}
          max={INITIAL_FILTERS.height.end}
          marks={{
            [INITIAL_FILTERS.height.start]: `${INITIAL_FILTERS.height.start}m`,
            [INITIAL_FILTERS.height.end]: `${INITIAL_FILTERS.height.end}m`,
            [filters.height.start]: `${filters.height.start}m`,
            [filters.height.end]: `${filters.height.end}m`
          }}
          defaultValue={[
            INITIAL_FILTERS.height.start,
            INITIAL_FILTERS.height.end
          ]}
          step={0.01}
          tooltipPlacement="bottom"
          onAfterChange={onSliderChange('height')}
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
          onChange={onSelectChange('positions')}
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
          onChange={onSelectChange('countries')}
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
          onChange={onSelectChange('strongFoots')}
        />
      </Col>

      <Col span={24}>
        <Title level={4} style={{ marginBottom: 0 }}>
          Player traits
        </Title>
      </Col>

      <Col span={12}>
        <FiltersSelect
          label="First strong point"
          disabled={filters.traits.length !== 0}
          placeholder="Main trait of the player..."
          values={getTraits()}
          onChange={onSelectChange('firstStrongPoints')}
        />
      </Col>

      <Col span={12}>
        <FiltersSelect
          label="Second strong point"
          disabled={filters.traits.length !== 0}
          placeholder="Nearly perfect trait of the player..."
          values={getTraits()}
          onChange={onSelectChange('secondStrongPoints')}
        />
      </Col>

      <Col span={12}>
        <FiltersSelect
          label="Third strong point"
          disabled={filters.traits.length !== 0}
          placeholder="Really good trait of the player..."
          values={getTraits()}
          onChange={onSelectChange('thirdStrongPoints')}
        />
      </Col>

      <Col span={12}>
        <FiltersSelect
          label="Fourth strong point"
          disabled={filters.traits.length !== 0}
          placeholder="Above average trait of the player..."
          values={getTraits()}
          onChange={onSelectChange('fourthStrongPoints')}
        />
      </Col>

      <Col span={16}>
        <FiltersSelect
          label="Any trait"
          disabled={anyTraitDisabled()}
          placeholder="Sprinter, physical..."
          values={getTraits()}
          onChange={onSelectChange('traits')}
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
};

export default DashboardFilters;
