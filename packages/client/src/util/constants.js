import React from 'react';

import { Button, Tag, Typography } from 'antd';

import { StarFilled, StarOutlined } from '@ant-design/icons';

import { useAppContext } from './context';

export const POSITIONS = {
  1: { l: 'Goalkeeper', s: 'GK', color: '#23a6fd' },
  2: { l: 'Right back', s: 'SB', color: '#2b9bf0' },
  3: { l: 'Center back', s: 'CB', color: '#2f91e3' },
  4: { l: 'Left back', s: 'LB', color: '#3287d5' },
  5: { l: 'Center defensive mid', s: 'CDM', color: '#347dc8' },
  6: { l: 'Midfielder', s: 'CM', color: '#3473bb' },
  7: { l: 'Right mid', s: 'RM', color: '#3469ae' },
  8: { l: 'Left mid', s: 'LM', color: '#3360a2' },
  9: { l: 'Right wing', s: 'RW', color: '#315695' },
  10: { l: 'Left wing', s: 'LW', color: '#2f4d88' },
  11: { l: 'Striker', s: 'ST', color: '#2c457c' }
};

export const PLAYER_TRAITS = {
  1: 'Sprinter',
  2: 'Physical',
  3: 'Aerial Specialist',
  4: 'Power Header',
  5: 'Early Crosser',
  6: 'Dives into Tackles',
  7: 'Finesse Shot',
  8: 'Chip Shot',
  9: 'Flair',
  10: 'Injury Prone',
  11: 'Leadership',
  12: 'Long Passer',
  13: 'Long Shot Taker',
  14: 'Long Throw-in',
  15: 'One Club Player',
  16: 'Outside Foot Touch',
  17: 'Playmaker',
  18: 'Power Free-kick',
  19: 'Team Player',
  20: 'Speed Dribbler',
  21: 'Technical Dribbler',
  22: 'Penalty Expert'
};

export const REVERSE_PLAYER_TRAITS = Object.entries(PLAYER_TRAITS).map(
  ([key, value]) => ({ [value]: key })
);

export const KEEPER_TRAITS = {
  23: 'Air Balls',
  24: 'Penalty Expert',
  25: 'Power shoot',
  26: 'Playmaker'
};

export const REVERSE_KEEPER_TRAITS = Object.entries(KEEPER_TRAITS).map(
  ([key, value]) => ({ [value]: key })
);

export const COLOR_LIST = ['#cc2222', '#d8591a', '#e0831c', '#e3aa30'];

export const COUNTRY_FLAGS = {
  Brazil: '🇧🇷',
  Italy: '🇮🇹',
  Spain: '🇪🇸',
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸',
  Portugal: '🇵🇹',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Russia: '🇷🇺',
  Belgium: '🇧🇪',
  Uruguay: '🇺🇾',
  Netherlands: '🇳🇱',
  Switzerland: '🇨🇭',
  Poland: '🇵🇱',
  Austria: '🇦🇹',
  Sweden: '🇸🇪',
  Denmark: '🇩🇰',
  Croatia: '🇭🇷',
  Norway: '🇳🇴',
  Ireland: '🇮🇪',
  'Czech Republic': '🇨🇿',
  Hungary: '🇭🇺',
  Mexico: '🇲🇽',
  Colombia: '🇨🇴',
  Chile: '🇨🇱',
  Paraguay: '🇵🇾',
  Nigeria: '🇳🇬',
  Ghana: '🇬🇭',
  'South Africa': '🇿🇦',
  'Ivory Coast': '🇨🇮'
};

// Table
export const COLUMNS = (modal = false) => [
  {
    title: '',
    dataIndex: '',
    key: 'favourite',
    fixed: 'left',
    width: 64,
    render: (_, record) => {
      const {
        user: { user },
        favourites
      } = useAppContext();

      return (
        <Button
          type="text"
          disabled={!user}
          icon={
            favourites.players.findIndex(({ id }) => id === record.id) ===
            -1 ? (
              <StarOutlined
                key={`fav-${record.id}`}
                onClick={() => favourites.toggleFavourite(record)}
              />
            ) : (
              <StarFilled
                key={`fav-${record.id}`}
                style={{ color: '#ffdf00' }}
                onClick={() => favourites.toggleFavourite(record, true)}
              />
            )
          }
          shape="circle"
        />
      );
    }
  },
  {
    title: 'Player name',
    dataIndex: 'fullName',
    key: 'fullName',
    fixed: 'left',
    width: modal ? 200 : 300
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    width: 225,
    render: ({ l, s, color }, { id }) => (
      <Tag
        key={`position-${id}`}
        color={`${color}20`}
        style={{
          color,
          border: `1px solid ${color}`,
          margin: '4px'
        }}
      >{`${l} (${s})`}</Tag>
    )
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 175
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    width: 175,
    render: (height, { id }) => (
      <Typography key={`height-${id}`}>{`${height} m`}</Typography>
    )
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    width: 175,
    render: (weight, { id }) => (
      <Typography key={`weight-${id}`}>{`${weight} kg`}</Typography>
    )
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: 175,
    render: (country, { id }) => (
      <Typography
        key={`country-${id}`}
      >{`${COUNTRY_FLAGS[country]} ${country}`}</Typography>
    )
  },
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    width: 175
  },
  {
    title: 'Strong foot',
    dataIndex: 'strongFoot',
    key: 'strongFoot',
    width: 175,
    render: (side, { id }) => (
      <Typography
        key={`strong-foot-${id}`}
      >{`${side[0].toUpperCase()}${side.slice(1)}`}</Typography>
    )
  },
  {
    title: 'Traits',
    dataIndex: 'traits',
    key: 'traits',
    width: 400,
    render: (traits) =>
      traits.map((trait, i) => (
        <Tag
          key={`${trait}-${i}`}
          color={`${COLOR_LIST[i % COLOR_LIST.length]}20`}
          style={{
            color: COLOR_LIST[i],
            border: `1px solid ${COLOR_LIST[i]}`,
            margin: '4px'
          }}
        >
          {trait.toUpperCase()}
        </Tag>
      ))
  }
];
