import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
  it('should run', () => {
    const component = TestRenderer.create(<App />);
    expect(component).toMatchSnapshot();
  });
});
