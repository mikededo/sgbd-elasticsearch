import React, { useState } from 'react';

import { Button, Form, Input, Space, Typography } from 'antd';
import { useAppContext } from '../util';

const { Title } = Typography;

const SingInContent = () => {
  const { user } = useAppContext();

  const [login, setLogin] = useState(true);

  const handleOnSubmit = (data) => {
    if (login) {
      user.login(data.email, data.password);
    } else {
      user.register(data.name, data.lastName, data.email, data.password);
    }
  };

  return (
    <>
      <Title level={5}>{login ? 'Log in' : 'Sign up'}</Title>

      <Form
        name="singin"
        onFinish={handleOnSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Space
          direction="vertical"
          size={8}
          style={{ width: '300px', marginBottom: login ? '8px' : '16px' }}
        >
          {!login && (
            <>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Name is required!' }]}
                style={{ marginBottom: '0px' }}
              >
                <Input placeholder="John" />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Last name is required!' }]}
                style={{ marginBottom: '0px' }}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input type="email" placeholder="john.doe@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Password is required!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password placeholder="Min. 6 characters..." />
          </Form.Item>
        </Space>

        <Form.Item style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} size={8}>
            <Button
              style={{ marginRight: '8px' }}
              type="text"
              onClick={() => setLogin((prev) => !prev)}
            >
              {login ? 'Sign up' : 'Log in'}
            </Button>
            <Button type="primary" htmlType="submit" loading={user.loading}>
              {login ? 'Log in' : 'Sign up'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default SingInContent;
