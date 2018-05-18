import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const { mount, render, shallow } = require('enzyme');
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require('react');
