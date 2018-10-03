import React from 'react';
import style from './App.css';
import { get } from 'lodash-es';

class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello <span className={get(style, 'name')}>React!</span>
      </div>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
