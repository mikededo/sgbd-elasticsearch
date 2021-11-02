import React from 'react';

import { Layout, Typography } from 'antd';

import { Dashboard, HeaderProfile } from './components';

const { Footer, Header, Content } = Layout;
const { Title } = Typography;

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#333333'
      }}
    >
      <Title style={{ color: 'white', margin: 0 }} className="logo">
        FutBase
      </Title>

      <HeaderProfile />
    </Header>

    <Content
      style={{
        padding: '50px',
        paddingBottom: 0
      }}
    >
      <Dashboard />
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      FutBase - All rights reserved &copy; 2021
    </Footer>
  </Layout>
);

export default App;
