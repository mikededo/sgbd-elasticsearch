import React, { useState } from 'react';

import { Layout, Modal, Typography } from 'antd';

import { Dashboard, HeaderProfile, Table } from './components';
import { COLUMNS, useAppContext } from './util';

const { Footer, Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const {
    favourites: { players, loading }
  } = useAppContext();

  const [showFav, setShowFav] = useState(false);

  const handleOnFavouritesClick = () => {
    setShowFav(true);
  };

  return (
    <>
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

          <HeaderProfile onFavouritesClick={handleOnFavouritesClick} />
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

      <Modal
        visible={showFav}
        width="80%"
        title={
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            Favourite players
          </Typography.Title>
        }
        onCancel={() => setShowFav(false)}
        footer={null}
      >
        <Typography>
          Revise the players you have marked as favourite!
        </Typography>

        <section>
          <Table
            columns={COLUMNS(true)}
            dataSource={players}
            loading={loading}
          />
        </section>
      </Modal>
    </>
  );
};

export default App;
