import React from 'react';
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>
);
