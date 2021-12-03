import React, { useState } from 'react';

import { Button, Popover, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import ProfilePopoverContent from './ProfilePopoverContent';
import { useAppContext } from '../util';

const HeaderProfile = ({ onFavouritesClick }) => {
  const {
    user: { user }
  } = useAppContext();

  const [active, setActive] = useState(false);

  const handleOnFavouritesClick = () => {
    setActive(false);
    onFavouritesClick();
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      {user && (
        <Typography.Text style={{ color: 'white', marginRight: '8px' }}>
          {user.name} {user.lastName}
        </Typography.Text>
      )}

      <Popover
        trigger="click"
        visible={active}
        onVisibleChange={() => setActive((prev) => !prev)}
        content={
          <ProfilePopoverContent onFavouritesClick={handleOnFavouritesClick} />
        }
        placement="bottomRight"
      >
        <Button style={{ borderRadius: '50%' }} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default HeaderProfile;
