import React, { useState } from 'react';

import { Button, Popover } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import ProfilePopoverContent from './ProfilePopoverContent';

const HeaderProfile = () => {
  const [active, setActive] = useState(true);

  return (
    <Popover
      trigger="click"
      visible={active}
      onVisibleChange={() => setActive((prev) => !prev)}
      content={<ProfilePopoverContent />}
      placement="bottomRight"
    >
      <Button style={{ borderRadius: '50%' }} icon={<UserOutlined />} />
    </Popover>
  );
};

export default HeaderProfile;
