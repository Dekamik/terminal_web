import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "@fontsource/goldman";
import "@fontsource/major-mono-display";
import "@fontsource/poiret-one";
import "@fontsource/roboto-slab";
import "typeface-audiowide";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
