import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('should render', () => {
    const component = TestRenderer.create(<App />);
    expect(component).toMatchSnapshot();
  });

  it('should render .name', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.name').length).toBe(1);
  });
});
