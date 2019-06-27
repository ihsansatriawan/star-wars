import React from 'react';
import ReactDOM from 'react-dom';

// main app
import { Provider } from 'react-redux';
import AppRoutes from './src/routes';
import store from './src/store';

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
)