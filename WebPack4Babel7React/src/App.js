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

    return (
      <>
        <div>
          {this.state.goodbye ? 'Bye' : 'Hello'} <span className={name}>React!</span>
        </div>
        <div>Default: {moment().format('LLLL z')}</div>
        <div>
          Asia/Tokyo:{' '}
          {moment()
            .tz('Asia/Tokyo')
            .format('LLLL z')}
        </div>
      </>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
