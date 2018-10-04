import React from 'react';
import style from './App.css';
import { get } from 'lodash';
import { timer } from 'rxjs';
import moment from 'moment-timezone';

class Hello extends React.Component {
  state = {};

  componentDidMount() {
    // just demonstrate RxJS usage
    timer(5000).subscribe(val => this.setState({ goodbye: true }));
  }

  render() {
    // just demonstrate lodash usage
    const name = get(style, 'name');
    const currentZoneTime = moment('1995-12-25');
    const asiaZoneTime = moment('1995-12-25').tz('Asia/Tokyo');
    return (
      <>
        <p>
          {this.state.goodbye ? 'Bye' : 'Hello'} <span className={name}>React!</span>
        </p>
        <p>{currentZoneTime.format('LLLL z')}</p>
        <p>{asiaZoneTime.format('LLLL z')}</p>
      </>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
