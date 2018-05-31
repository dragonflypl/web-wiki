# Testing

* `react-test-renderer` - for snapshots

```js
import TestRenderer from 'react-test-renderer';
```

* `enzyme` - for interaction. `shallow` does not render children. To test lifecycle methods and children interaction, use `mount`.
* `react-addons-test-utils` - used by enzyme

## Types of testing

* Unit testing - enzyme's shallow can be useful
* Interaction testing - use enzyme (e.g. clicking etc)
* Structural testing - possible with snapshots, usually this is what stateless functional components need
* Style testing (like PhantomCSS)

### Enzyme

Enzyme enables component creation and nice syntax for querying component's content.

It is high level abstraction over React test utils (officially recommended by React team).

No matter which enzyme renderer you use, you will get similar wrapper API for quering / simulate user interaction.

#### Installation

This applies to latest Enzyme and React 16+.

> npm i --save-dev enzyme enzyme-adapter-react-16

and put:

```javascript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

in Jest configuration file (e.g. `"setupTestFrameworkScriptFile": "<rootDir>/src/setupTests.js",`)

To use custom matchers & assertions from enzyme, install:

> npm install jest-enzyme --save-dev

and do the import in Jest's config file `import 'jest-enzyme';`.

Benefits are:

* when doing snapshot testing, snapshot are written nicely with HTML structure
* it adds additional assertions e.g. `toContainReact`.

```javascript
const wrapper = shallow(<Footer />);
expect(wrapper).toContainReact(<h2>This is random number: 10</h2>);
```

Full list of matchers is here: <https://github.com/FormidableLabs/enzyme-matchers>

#### Enzyme & static rendering

```javascript
import { render } from 'enzyme';
it('should render with render', () => {
  const wrapper = render(<TodoList todos={todos} />);
  expect(wrapper).toMatchSnapshot();
});
```

<https://github.com/airbnb/enzyme/blob/master/docs/api/render.md>

Output is very similar to `mount` and `react-test-renderer`, however it only contains HTML markup (no extra information) e.g.

```html
<ul>
  <li
    style="text-decoration:none"
  >
    Learn enzyme
  </li>
  <li
    style="text-decoration:line-through"
  >
    Learn react-test-renderer
  </li>
</ul>
```

#### Enzyme & full dom rendering with mount

```javascript
import { mount } from 'enzyme';
it('should render with mount', () => {
  const wrapper = mount(<TodoList todos={todos} />);
  expect(wrapper).toMatchSnapshot();
});
```

Output is similar to `react-test-renderer` (it additionally renders tags for React components)

```html
<TodoList
  todos={
    Array [
      Object {
        "id": 1,
        "text": "Learn enzyme",
      },
      Object {
        "completed": true,
        "id": 2,
        "text": "Learn react-test-renderer",
      },
    ]
  }
>
  <ul>
    <Todo
      id={1}
      key="1"
      onClick={[Function]}
      text="Learn enzyme"
    >
      <li
        onClick={[Function]}
        style={
          Object {
            "textDecoration": "none",
          }
        }
      >
        Learn enzyme
      </li>
    </Todo>
    <Todo
      completed={true}
      id={2}
      key="2"
      onClick={[Function]}
      text="Learn react-test-renderer"
    >
      <li
        onClick={[Function]}
        style={
          Object {
            "textDecoration": "line-through",
          }
        }
      >
        Learn react-test-renderer
      </li>
    </Todo>
  </ul>
</TodoList>
```

Also a browser environment like `jsdom` is needed.

This approach is used when:

* components interact with DOM API
* components are wrapped in HOC
* running lifecycle hooks is required

<https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md>

#### Enzyme & shallow rendering

```javascript
import { shallow } from 'enzyme';
it('should render with shallow', () => {
  const wrapper = shallow(<TodoList todos={todos} />);
  expect(wrapper).toMatchSnapshot();
});
```

Output is minimal: it contains rendered main component and children (but the output is not output from children's render function, it is only children passed to main component):

```html
<ul>
  <Todo
    id={1}
    key="1"
    onClick={[Function]}
    text="Learn enzyme"
  />
  <Todo
    completed={true}
    id={2}
    key="2"
    onClick={[Function]}
    text="Learn react-test-renderer"
  />
</ul>
```

With shallow rendering you can query rendered component and interact with events.

```javascript
import { shallow } from 'enzyme';
const wrapper = shallow(<ArticleList {...testProps} />);
wrapper.find('a').simulate('click'); // uses JSDOM under the hood
wrapper.instance(); // to access instance,methods etc...
```

<https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md> has API.

**shallow rendering does not need jsdom**.

#### Comparsion to shallow `react-test-renderer`

<https://reactjs.org/docs/shallow-renderer.html>

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';
it('should render with renderer shallow', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<TodoList todos={todos} />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
```

Will generate almost identical output to enzyme's shallow:

```html
<ul>
  <Todo
    id={1}
    onClick={[Function]}
    text="Learn enzyme"
  />
  <Todo
    completed={true}
    id={2}
    onClick={[Function]}
    text="Learn react-test-renderer"
  />
</ul>
```

#### Comparsion to full `react-test-renderer`

<https://reactjs.org/docs/test-renderer.html>

```javascript
import TestRenderer from 'react-test-renderer';
it('should render with renderer', () => {
  const component = TestRenderer.create(<TodoList todos={todos} />);
  expect(component.toJSON()).toMatchSnapshot();
});
```

Will generate similar output to mount, however without React tags:

```html
<ul>
  <li
    onClick={[Function]}
    style={
      Object {
        "textDecoration": "none",
      }
    }
  >
    Learn enzyme
  </li>
  <li
    onClick={[Function]}
    style={
      Object {
        "textDecoration": "line-through",
      }
    }
  >
    Learn react-test-renderer
  </li>
</ul>
```

#### How redux etc. affect testing strategies

If tested component has children that have dependencies (e.g. Redux store) then all non-shallow strategies will fail (unless dependency is fulfilled)

```javascript
jest.mock('../services/RandomNumber');

import React from 'react';
import Footer from './Footer';
import { shallow, mount, render } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render with shallow', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper).toMatchSnapshot();
});

// would fail as child is connected component
it.skip('should render with mount', () => {
  const wrapper = mount(<Footer />);
  expect(wrapper).toMatchSnapshot();
});

// would fail as child is connected component
it.skip('should render with render', () => {
  const wrapper = render(<Footer />);
  expect(wrapper).toMatchSnapshot();
});

// would fail as child is connected component
it.skip('should render with TestRenderer', () => {
  const component = TestRenderer.create(<Footer />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('should render with ShallowRenderer', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Footer />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
```

### Component testing

In react-redux world, components are usually written as display/presentational components that are later connected to redux via mapStateToProps and mapDispatchToProps. With this architecture, everything can be tested separately.

#### Testing display component

Simply import display component (the one that is not connected), provide it with a set of fake props and do snapshot testing (e.g. with `react-test-renderer`).

#### Testing mapStateToProps / mapDispatchToProps / Container component

Just export `mapStateToProps` from the component, and call it with a fake store & ownProps and check if result is OK:

```javascript
// inside component
export const mapStateToProps = (state, ownProps) => ({
  /**
   * Find the question in the state that matches the ID provided and pass it to the display component
   */
  ...state.questions.find(
    ({ question_id }) => question_id == ownProps.question_id
  )
});

// inside test
import { mapStateToProps } from '...';

it('should map state to props correctly', () => {
  const questionOne = {
    question_id: 42,
    body: 'Some body'
  };
  const state = { questions: [questionOne] };
  const ownProps = { question_id: 42 };
  const componentState = mapStateToProps(state, ownProps);
  expect(componentState).toBe(questionOne);
});
```

#### Testing statefull components

When testing stateful components (e.g. they have side effects) it is usually required to do some mocking.

Use `jest.mock` along with `require` and `__mocks__` to create manual / automatic mocks and configure them accordingly.

### Snapshot testing

Renderer can be used to do it;

```javascript
import renderer from 'react-test-renderer';
const tree = renderer.create(<div>Hello</div>).toJSON();
expect(tree).toMatchSnapshot();
```

You can use enzyme with this rendered to test shapshots of only parts of components.

Pros:

* fast and automatic
* catch regression

Const:

* protect only against regression
* easy to ignore

Use snapshot testing not only to assert UI changes. Use it for any serializable values that can change and manual checking of their content would require a great deal of code.

#### Snapshot serializers

`expect.addSnapshotSerializer` and that's it: you can have a custom representation in snapshots.

This is how other stuff is serialized (renderers, mount / shallow wrappers).

## Jest

Jest is like Jasmine/Mocha (BDD test runner with assertion library) with additional features like snapshot testing & module mocking & spies.

Matcher are documented here: <https://facebook.github.io/jest/docs/en/expect.html>

## Installation

What is needed:

* `jest`
* for babel integration: `babel-jest` & create babel configuration with proper presets(`.babelrc` or in `package.json`)

Jest automatically sets NODE_ENV to `test` when running tests. So if you need a specific preset / plugins etc for test environment, use babel's `env` key.

<https://facebook.github.io/jest/docs/en/getting-started.html> covers it all.

### Basic configuration

Some important keys:

* `setupTestFrameworkScriptFile` points to jest config file (e.g. configure enzyme adapter or globals)
* `moduleNameMapper` to specify how certain module imports (like images, less, css etc) shoule be handled by Jest, although it can be done with `transform` as well (check create-react-app)

### Configuring test environment

If you wish to configure environment for test (like enable globals), just extend `setupTests.js` file:

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const { mount, render, shallow } = require('enzyme');
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require('react');
```

With this setup in place, it's not longer required to import shallow, mount, render, React in test files.

### Jest API

* `it.only` (`fit`) is used to isolate test (run only this one test) and `it.skip`(`xit`) to skip test
* to handle async use `done` callback or return a promise from test or pass `async` function to `it` and use `await`. Also to ensure correct number assertions to be called (to avoid false positives/negatives) call `expect.assertions` to speficy how many assertions are expected to run during the test. There's also `resolves` and `rejects` matcher that operates on promise (they unwrap the promise). Examples are here: <https://github.com/facebook/jest/tree/master/examples/async>. For timers, use `jest.useFakeTimers/runAllTimers();` etc. More is here <https://facebook.github.io/jest/docs/en/timer-mocks.html>
* `before/afterAll` - before is good place to set up mocks e.g.

### Mocking with Jest

#### jest.fn

`jest.fn` creates a mock / spy.

Created mock has a `mock` property that exposes information about what happened to mock (how many times it was called etc).

To provide custom implementation of a mock use `mockImplementation` or `mockImplementationOnce` or `jest.fn` argument.

Mock assertions can be done manually with matchers like `toBeCalled` or via snapshots: `expect(mockFunc).toMatchSnapshot();`

Worth to remember: if you're reusing a mock then call `mockClear` in `beforeEach`.

```javascript
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';
jest.mock('./sound-player'); // SoundPlayer is now a mock constructor

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  SoundPlayer.mockClear();
});
```

#### jest.mock

Jest enables mocking with `jest.mock`.

Jest mocks whole ES6 modules exported from files (genMockFromModule). It replaces all functions with mocks. This is automatic mocking.

Jest will automatically hoist `jest.mock` calls to the top of the module (before any imports).

Full mocks API: <https://facebook.github.io/jest/docs/en/mock-function-api.html>

### Manual mocks with `__mocks__` folder

Content from mocks folder will be used by Jest when mocking happens.

Putting a mock inside mocks folder enables customization of automatic mock - this is called manual mocks.

With this approach you don't need to mock the same modules over and over in all tests.

So in order to mock a module:

* create mocks folder next to mocked module
* put a file with the same name as the name of mocked module in mocks folder
* create a mock (e.g. via `jest.genMockFromModule` and customizing automatic mock, or via `require.requireActual` and customizing actual implementation). If you don't need mock features, mock can be a stub or whatever object you like.
* use the mock inside test by telling Jest to mock it with with `jest.mock('nameOfTheModule')`

More here:

* <https://facebook.github.io/jest/docs/en/manual-mocks.html>
* <https://facebook.github.io/jest/docs/en/jest-object.html#jestgenmockfrommodulemodulename>
* <https://facebook.github.io/jest/docs/en/jest-object.html#jestmockmodulename-factory-options>

Example 1:

```javascript
// mocking
jest.mock('./../services/notificationService');

// importing mock in order to configure it
const notificationService = require('./../services/notificationService')
  .default;

// configure the mock
beforeAll(() => {
  notificationService._setValue(25);
});
```

Example 2:

```javascript
// RandomNumber.js
export default class RandomNumber {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  generate() {
    return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  }
}

// __mocks__/RandomNumber.js
const RandomNumber = require.requireActual('../RandomNumber').default;
RandomNumber.prototype.generate = function() {
  return this.min;
};
export default RandomNumber;

// or via full mock

const RandomNumberMock = jest.genMockFromModule('../RandomNumber').default;
RandomNumberMock.prototype.generate.mockReturnValue(10);
export default RandomNumberMock;

// or just dummy implementation
export default class { .... }

// somewhere in tests
jest.mock('../pathTo/RandomNumber');
```

It is also possible to mock `node_modules`.

In order to do so, create mocks folder next to `node_modules` and create folders with the same name as npm package.

### jest.mock with the module factory parameter

This technique allows for providing a factory function that will create a mock (e.g. used when mocking React components)

### Replacing mock with another mock

If you already have a manual mock, and for whatever reason you want to replace with another mock (for single test or whole suite), then use: `mockImplementation` or `mockImplementationOnce`:

```javascript
jest.mock('../services/RandomNumber'); // manual mock will be used
import RandomNumber from '../services/RandomNumber'; // importing module which will be a manual mock

it('should render with ShallowRenderer', () => {
  RandomNumber.prototype.generate.mockImplementation(() => 20);
  const renderer = new ShallowRenderer();
  renderer.render(<Footer />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
```

## Comparsion

| Feature                 | Enzyme shallow | Enzyme mount | Enzyme static | Full react-test-renderer |
| ----------------------- | :------------: | -----------: | ------------- | ------------------------ |
| jsdom needed            |       NO       |          YES | NO            | NO                       |
| running lifecycle hooks |       NO       |          YES | ?             | ?                        |

## Tools

### Migration

It's possible to migrate from many other test frameworks to Jest with `jest-codemods`

### VSCode integration

Install:

* snapshot tools
* Jest extension

## Thoughs on tests

What makes a good test:

* run fast (affects CI, test your patience)
* easy to read/understand (nobody will fix test if it is hard to understand)
* catch bugs (try to break something in you code and expect test to fail)
* don't break often (e.g. refactoring is done, app is working but all test go red)
* good coverage to effort ratio

Principles:

* testing UI is hard
* try to mock as less a possible
* try not to isolate to much (more isolation -> less bugs caught)

General solution according to principles:

* make the test to be UI
  * if component is dispatching and action, make the test to dispatch an actions
  * if component is reading from the store, make the test read from the store

So test structure could be:

* setup initial state
* dispatch an action
* expect data to change

Disadvanatages:

* initial state is hard to setup

How to make tests clean:

* write TEST UTILITIES!
  * never but JSON test data in your tests. 99% of cases it could be reused!

Areas of testing:

* UI components
  * test what is dynamic, functionality of component (conditions, loops, event handlers, rendered content)
  * Enzyme recommends a natural / user-like flow in tests (e.g. don't set state manually, instead simulate clicks etc.)
  * for typical UI rendered content testing, use snapshots (there's no need to write selectors, count elements etc.)
* Data mutation
* Routing
* Remember: simulate you did a mistake and see if test caught it

## WebPack integration

Webpack handles everything. Jest does not use webpack, so some features have to me mocked, e.g.:

* handle imports of resources that are no JS (e.g. css / jpg / fonts etc). To do so, use `moduleNameMapper` of `transform`.

## TODO:

* https://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/ : when to do snapshot testing
