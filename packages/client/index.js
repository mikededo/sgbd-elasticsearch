import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App, AppContext } from './src';

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById('root')
);
