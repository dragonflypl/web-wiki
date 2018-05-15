jest.mock('../services/RandomNumber');

import React from 'react';
import Footer from './Footer';
import { shallow } from 'enzyme';


describe("Footer test", () => {
  it('should render', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot();
  })
})
