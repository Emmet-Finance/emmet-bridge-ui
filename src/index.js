import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import store from './data/store.ts'
import App from './components/App/App.tsx';

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)