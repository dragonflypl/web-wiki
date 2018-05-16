jest.mock('../services/RandomNumber');

// React, mount, shallow, render is available on globals thanks to setupTests.js

import Footer from './Footer';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Footer', () => {

  it('should render with shallow', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should render with mount', () => {
    const wrapper = mount(<Footer />)
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should render with render', () => {
    const wrapper = render(<Footer />)
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should render with TestRenderer', () => {
    const component = TestRenderer.create(<Footer />) ;
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with ShallowRenderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Footer />) ;
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

})
