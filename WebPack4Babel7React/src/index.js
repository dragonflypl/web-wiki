import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moment from 'moment-timezone';

moment.tz.setDefault('Europe/Zurich');

ReactDOM.render(<App />, document.getElementById('index'));
