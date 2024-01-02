import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import { reducers } from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <GoogleOAuthProvider clientId='1025625920960-i3jbve7e76ia2n1lakde6alj5ojiqdn4.apps.googleusercontent.com'>
  <Provider store={store}>
    <App />
  </Provider>,
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);