# Testing

- `react-test-renderer` - for snapshots

```
import TestRenderer from 'react-test-renderer';
```

- `enzyme` - for interaction. `shallow` does not render children. To test lifecycle methods and children interaction, use `mount`. 
- `react-addons-test-utils` - used by enzyme

## Types of testing

- Unit testing - enzyme's shallow can be useful
- Interaction testing - use enzyme (e.g. clicking etc)
- Structural testing - possible with snapshots, usually this is what stateless functional components need
- Style testing (like PhantomCSS)

### Enzyme & shallow rendering

Enzyme enables component creation and nice syntax for querying component's content etc... Also it enables shalow rendering (only component being created is rendered, child components not), this is perfect for unit testing.

Instead of `renderer.create`, use:

```javascript
import { shallow } from 'enzyme';
const wrapper = shallow(<ArticleList {...testProps} />);
wrapper.find('a').simulate('click'); // uses JSDOM under the hood
wrapper.instance(); // to access instance,methods etc...
```

### Component testing

In react-redux world, components are usually written as display/presentational components that are later connected to redux via mapStateToProps and mapDispatchToProps. With this architecture, everything can be tested separately.

#### Testing display component

Simply import display component (the one that is not connected), provide it with a set of fake props and do snapshot testing (e.g. with `react-test-renderer`).

#### Testing mapStateToProps / mapDispatchToProps / Container component

Just export `mapStateToProps` from the component, and call it with a fake store & ownProps and check if result is OK:


``` javascript
// inside component
export const mapStateToProps = (state,ownProps)=>({
    /**
     * Find the question in the state that matches the ID provided and pass it to the display component
     */
    ...state.questions.find(({question_id})=>question_id == ownProps.question_id)
});

// inside test
import { mapStateToProps } from '...';

it ('should map state to props correctly', () => {
  const questionOne = {
    question_id: 42,
    body: 'Some body'
  }
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
import renderer from 'react-test-renderer'
const tree = renderer.create(<div>Hello</div>).toJSON()
expect(tree).toMatchSnapshot();
```

You can use enzyme with this rendered to test shapshots of only parts of components.

Pros:

- fast and automatic
- catch regression

Const:

- protect only against regression
- easy to ignore

## Jest

Jest is like Jasmine/Mocha (BDD test runner with assertion library) with additional features like snapshot testing & module mocking & spies.

### Jest API

- `it.only` is used to isolate test (run only this one test) and `it.skip` to skip test
- to handle async use `done` callback or return a promise from test or pass `async` function to `it`
- `jest.fn` creates a spy
- `before/afterAll` - before is good place to set up mocks e.g.

``` javascript
// mocking 
jest.mock('./../services/notificationService');

// importing mock in order to configure it
const notificationService = require('./../services/notificationService').default;

// configure the mock
beforeAll(() => { notificationService._setValue(25) });
```

### Mocking with Jest

Jest enables mocking with `jest.mock`. Jest mocks whole ES6 modules exported from files (genMockFromModule). It replaces all functions with mocks. This is automatic mocking.

Jest will automatically hoist `jest.mock` calls to the top of the module (before any imports).

Full mocks API: <https://facebook.github.io/jest/docs/en/mock-function-api.html>

### Manual mocks with `__mocks__` folder

Content from mocks folder will be used by Jest when mocking happens. 

Putting a mock inside mocks folder enables customization of automatic mock - this is called manual mocks.
 
With this approach you don't need to mock the same modules over and over in all tests.

So in order to mock a module:

- create mocks folder next to mocked module
- put a file with the same name as the name of mocked module in mocks folder
- create a mock (e.g. via `jest.genMockFromModule` and customizing automatic mock, or via `require.requireActual` and customizing actual implementation)
- use the mock inside test by telling Jest to mock it with with `jest.mock('nameOfTheModule')`

More here:
- <https://facebook.github.io/jest/docs/en/manual-mocks.html>
- <https://facebook.github.io/jest/docs/en/jest-object.html#jestgenmockfrommodulemodulename>
- <https://facebook.github.io/jest/docs/en/jest-object.html#jestmockmodulename-factory-options>

Example:

``` javascript
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
RandomNumberMock.mockImplementation(function() {
  return {
    generate: () => 10
  }
});

export default RandomNumberMock;


// somewhere in tests
jest.mock('../pathTo/RandomNumber');
```

It is also possible to mock `node_modules`. 

In order to do so, create mocks folder next to `node_modules` and create folders with the same name as npm package.
