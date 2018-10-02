import React from 'react';
import style from './App.css';

class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello <span className={style.name}>React!</span>
      </div>
    );
  }
}

const App = () => {
  return <Hello />;
};

export default App;
