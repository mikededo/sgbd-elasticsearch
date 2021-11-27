import React, { useState } from 'react';
import { Button, Checkbox, Input, Space, Typography } from 'antd';

const { Title } = Typography;


const SingInContent = () => {
  const [login, setLogin] = useState(false);

  return (
    <>
      <Title level={5}>{login ? 'Log in' : 'Sign up'}</Title>

      <Space
        direction="vertical"
        size={8}
        style={{ width: '300px', marginBottom: login ? '8px' : '16px' }}
      >
        {!login && (
          <>
            <div>
              <Typography.Text strong>Name</Typography.Text>
              <Input type="text" placeholder="John" />
            </div>

            <div>
              <Typography.Text strong>Last name</Typography.Text>
              <Input type="text" placeholder="Doe" />
            </div>
          </>
        )}

        <div>
          <Typography.Text strong>Email</Typography.Text>
          <Input type="email" placeholder="john.doe@example.com" />
        </div>

        <div>
          <Typography.Text strong>Password</Typography.Text>
          <Input type="password" placeholder="Min. 6 characters..." />
        </div>

        {login && <Checkbox>Remember me</Checkbox>}
      </Space>

      <Space style={{ alignSelf: 'flex-end' }} size={8}>
        <Button type="text" onClick={() => setLogin((prev) => !prev)}>
          {login ? 'Sign up' : 'Log in'}
        </Button>
        <Button type="primary">{login ? 'Log in' : 'Sign up'}</Button>
      </Space>
    </>
  );
};

export default SingInContent;
