import React from 'react';

import { Menu } from 'antd';

import { useAppContext } from '../util';
import SingInContent from './SingInContent';

const ProfilePopoverContent = () => {
  const { user } = useAppContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {user ? (
        <Menu mode="inline">
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
        </Menu>
      ) : (
        <SingInContent />
      )}
    </div>
  );
};

export default ProfilePopoverContent;
