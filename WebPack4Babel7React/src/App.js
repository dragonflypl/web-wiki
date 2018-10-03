import React from 'react';
import style from './App.css';
import { get } from 'lodash-es';
import { timer } from 'rxjs';

class Hello extends React.Component {
  state = {};

  componentDidMount() {
    // just demonstrate RxJS usage
    timer(5000).subscribe(val => this.setState({ goodbye: true }));
  }

  render() {
    // just demonstrate lodash-es usage
    const name = get(style, 'name');
    return (
      <div>
        {this.state.goodbye ? 'Bye' : 'Hello'} <span className={name}>React!</span>
      </div>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
