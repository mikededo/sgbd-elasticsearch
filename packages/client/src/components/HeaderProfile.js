import React, { useState } from 'react';

import { Button, Popover, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import ProfilePopoverContent from './ProfilePopoverContent';
import { useAppContext } from '../util';

const HeaderProfile = () => {
  const { user } = useAppContext();

  const [active, setActive] = useState(false);

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
          {user.firstName} {user.lastName}
        </Typography.Text>
      )}

      <Popover
        trigger="click"
        visible={active}
        onVisibleChange={() => setActive((prev) => !prev)}
        content={<ProfilePopoverContent />}
        overlayStyle={{ padding: user ? '0' : undefined }}
        placement="bottomRight"
      >
        <Button style={{ borderRadius: '50%' }} icon={<UserOutlined />} />
      </Popover>
    </div>
  );
};

export default HeaderProfile;
