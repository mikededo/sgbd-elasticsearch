import React from 'react';

import { Layout, Typography } from 'antd';

import FinderContent from './components';

const { Footer, Header, Content } = Layout;
const { Title } = Typography;

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>
      <Title style={{ color: 'white' }}>FutBase</Title>
    </Header>

    <Content
      style={{
        padding: '50px',
        paddingBottom: 0
      }}
    >
      <FinderContent />
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      FutBase - All rights reserved &copy; 2021
    </Footer>
  </Layout>
);

export default App;
