import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const component = TestRenderer.create(<App />);
    expect(component).toMatchSnapshot();
  });

  it('should render Hello', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Hello').length).toBe(1);
  });

  it('should shallow render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
