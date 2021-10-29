import React from 'react';

import { Tag, Typography } from 'antd';

export const POSITIONS = {
  1: { l: 'Goalkeeper', s: 'GK' },
  2: { l: 'Right back', s: 'SB' },
  3: { l: 'Center back', s: 'CB' },
  4: { l: 'Left back', s: 'LB' },
  5: { l: 'Center defensive mid', s: 'CDM' },
  6: { l: 'Midfielder', s: 'CM' },
  7: { l: 'Right mid', s: 'RM' },
  8: { l: 'Left mid', s: 'LM' },
  9: { l: 'Right wing', s: 'RW' },
  10: { l: 'Left wing', s: 'LW' },
  11: { l: 'Striker', s: 'ST' }
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

export const KEEPER_TRAITS = {
  23: 'Air Balls',
  24: 'Penalty Expert',
  25: 'Power shoot',
  26: 'Playmaker'
};

export const COLOR_LIST = ['#ff5f32', '#ff8e39', '#ffb750', '#ffdb75'];

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
export const COLUMNS = [
  {
    title: 'Player name',
    dataIndex: 'fullName',
    key: 'fullName',
    fixed: 'left',
    width: 300
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    width: 175,
    render: (height) => <Typography>{`${height} m`}</Typography>
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    width: 175,
    render: (weight) => <Typography>{`${weight} kg`}</Typography>
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: 175,
    render: (country) => (
      <Typography>{`${COUNTRY_FLAGS[country]} ${country}`}</Typography>
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
    render: (side) => (
      <Typography>{`${side[0].toUpperCase()}${side.slice(1)}`}</Typography>
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
          color={`${COLOR_LIST[i]}55`}
          style={{
            color: '#595959',
            border: `1px solid ${COLOR_LIST[i]}`,
            margin: '4px'
          }}
        >
          {trait.toUpperCase()}
        </Tag>
      ))
  }
];
