import React from 'react';
import style from './App.css';

const Hello = () => (
  <div>
    Hello <span className={style.name}>React!</span>
  </div>
);

const App = () => {
  return <Hello />;
};

export default App;
