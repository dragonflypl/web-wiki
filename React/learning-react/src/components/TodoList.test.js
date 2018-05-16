
import React from 'react';
import TodoList from './TodoList';
import { shallow, mount, render } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

const todos = [
  { id: 1, text: 'Learn enzyme' },
  { id: 2, text: 'Learn react-test-renderer', completed: true }
];

it('should render with shallow', () => {
  const wrapper = shallow(<TodoList todos={todos} />)
  expect(wrapper).toMatchSnapshot();
});

it('should render with mount', () => {
  const wrapper = mount(<TodoList todos={todos} />)
  expect(wrapper).toMatchSnapshot();
});

it('should render with render', () => {
  const wrapper = render(<TodoList todos={todos} />)
  expect(wrapper).toMatchSnapshot();
});

it('should render with TestRenderer', () => {
  const component = TestRenderer.create(<TodoList todos={todos} />) ;
  expect(component.toJSON()).toMatchSnapshot();
});

it('should render with ShallowRenderer', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<TodoList todos={todos} />) ;
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
