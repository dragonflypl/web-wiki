

## React app

First decision to make is to decide on components structure. 

## React Components

Component needs to be mount in to the browser. `ReactDOM.render(component, placeToMountTheComponent)`.

Naming convention is to use title case for naming the components e.g. `Button`.

React component returns a description of user interface in the form of React element (`render` method or component function). 
Rendering of this React elements is done via `ReactDOM` library. 

### Container components

A components that does anything beside presenting UI is known as a container component `ArticleContainer`:

```
const ArticleContainer = (props, { store }) => {
  return <Article {...props} store={store} />;
};
```

It is commonly used to access e.g. context and pass it down to presentational component (`Article`) as props.

- It is aware of Redux.
- Focus on how things work.
- subscribe to redux state
- dispatch redux actions
- generate by react-redux

### Presentational components

- Focus on how things look
- unaware of redux
- read data from props
- invoke callbacks on props
- written by hand, often only render function

### Pure components

`React.PureComponent` will rerender only if shallow comparison of props & state detect changes.

To force updates, call `forceUpdate` method.

### Higher order component (function)

This is a generic function that generates a container components:

```
import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps) => (Component) => {
  return class extends React.Component {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };

    render() {
      return <Component
        {...this.props}
        {...extraProps(this.context.store, this.props)}
        store={this.context.store} />;
    }
  };
};

export default storeProvider;
```

And usage:

```
function extraProps(store, originalProps) {
  return {
    author: store.lookupAuthor(originalProps.article.authorId),
  };
}

export default storeProvider(extraProps)(Article);
```


### Component keys

If components are rendered from arrays, add `key` property to component. React will use it to identify components and optimize rendering: `<SomeComponent key={data.id} />`.

### (stateless) Function Component

Simplest form of component: function that takes inputs (properties, props) and returns JSX.

```
const Button = () => {
  return (
    <button>Go</button>
  )
}
```

To mount this component: `ReactDOM.render(<Button />, mountNode)`.

To use props, add argument and use props in JSX using `{}`

```
const Button = (props) => {
  return (
    <button>{props.label}</button>
  )
}
```

and `ReactDOM.render(<Button label="Go" />, mountNode)`

### Class Component

> Use them only when you have a state to manage or personalized event handlers or need lifecyclehooks or access to DOM is needed or may child functions (for performance reasons, so that they're on prototype. In function components child functions would be created for each component thus bloating the memory)

Apart from props, it can have private internal state. State can be changed, props not! Class component can change only its internal state.

State is available via `this.state`. State is available only to component it belongs, it is private.

```
class Button extends React.Component {
	
  // not mandatory
  constructor(props) {
  	super(props);
  }
  
  state = { counter: 0 };

	handleClick = () => {
  	//this.setState({ counter: this.state.counter + 1 });
    
    // or safer method - updater function: use it if you access previous state value
    // The output of the updater is shallowly merged with prevState.
    this.setState((prevState) => ({ 
    	counter: prevState.counter + 1
    }));
  }
  
	render() {
  	return (
    	<button onClick={this.handleClick}>{this.props.label} {this.state.counter}</button>
    )
  }
}

ReactDOM.render(<Button label="Counter: " />, mountNode)
```

### Styling components

Inline styles can be used: `style={{ display: 'inline-block'}}` as well as classes (`className` attribute) e.g.

`<button className="btn" style={{color: 'blue'}} onClick={this.handleClick}>{this.props.label} {this.state.counter}</button>`

### Access to the DOM elements

In order to get access to element in JSX, use `ref` attribute: `<input ref={(input) => this.someInput = input} />`. This `ref` function will execute when element is mounted.

```
const Item = (props) => {
	return (
  	<div ref={(el) => console.log('Logged output', el.innerHTML)}>{props.data}</div>
  )
}
```

Alternative to `ref` is controlled components:

- use `value="this.state.field"` to bind state to input
- use `onChange="this.setState({ field: event.target.value })" to update the value

```
class Form extends React.Component {
	state = { inputValue: 'Default' };
	render() {
  	return (
    	<div>
        <input value={this.state.inputValue} onChange={(event) => this.setState({ inputValue: event.target.value })}  />      
        {this.state.inputValue}
      </div>
    )
  }
}
```

### Events

- `onSubmit` on form, remember to call `event.prefentDefault()`
- `onClick` on any

Any event handler receives `event` argument that is wrapper around native even object.

### Default properties

In order to provide default values for component properties, use `static defaultProps = { ... }` inside component.

### Rendering children

Component props have `children` property that has access to child components.  This is similar to transpilation in Angular.

## JSX

React compiles JSX into JavaScript with `React.createElement` etc. (JavaScript representation of the DOM). Both syntax can be used, yet JSX is simpler.

### Loops

In JSX we can use JavaScript, so rendering component for each element in array is as simple as mapping to React Component. Also react supporst object spread operator that passess all object properties to component:

```
const Item = (props) => {
	return (
  	<div>{props.data}</div>
  )
}

const Items = (props) => {
	return (
  	<div>{props.data.map(x => <Item {...x} />)}</div>
  )
}

class App extends React.Component {

	state = { data: [
    { data: 'One' },
    { data: 'Two' },
    { data: 'Three' }
  ] }

	render() {
  	return (
    	 <Items data={this.state.data} />
    )
  }
}

ReactDOM.render(<App />, mountNode)
```

## Virtual DOM

Using JavaScript to render HTML allows React to have a virtual representation of HTML in-memory (Virtual DOM).

React uses this concept to render and HTML tree virtually first (in-memory). When state changes and new tree is created, instead of writing whole tree, React renders only difference. This is called tree reconciliation

- What is tree reconciliation: it is a process of comparing old tree with new tree and updating only the difference in the DOM

## Ajax

Use case is simple. Just call `setState` in callback and react will update. 

## Server side rendering

Use: `import ReactDOMServer from 'react-dom/server'`

It:

- enables SEO, whole application in rendered on server.
- faster rendering on clients that are slow

When doing server side rendering with initial data, render this data to the client as well (e.g. by rendering it to `index.html` and make it a global variable), so that initial client side rendering renders exactly the same content (so it does not rerender the application).

## Context API

Context API enables sharing global stuff, without passing them as props down & down & down to child components.

Just define `getChildContext` & `childContextTypes` in parent + `contextTypes` in child, and second argument of components constructor will be context.

Using Context API is tricky, and at least makes testing harder (global dependency). To address some of the issues while testing, use Enzyme that does shalow rendering (react-test-renderer is tree renderer).

## Type checking 

It's possible to guard against invalid properties passed to components with `PropTypes`:

```
Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })
};
```

Another solution is to use `Flow` - typechecker: <https://flow.org/>

## Testing

### Enzyme & shallow rendering

Enzyme enables component creation and nice syntax for querying component's content etc... Also it enables shalow rendering (only component being created is rendered, child components not), this is perfect for unit testing.

Instead of `renderer.create`, use:

```
import { shallow } from 'enzyme';
const wrapper = shallow(<ArticleList {...testProps} />);
```

### Snapshot testing

Renderer can be used to do it;

```
import renderer from 'react-test-renderer'
const tree = renderer.create(<div>Hello</div>).toJSON()
expect(tree).toMatchSnapshot();
```

# Tools

- `jest`
- https://jscomplete.com/repl/ : playground
- react-devtools
- https://github.com/axios/axios
- https://github.com/facebook/create-react-app : create react app
- `eslint`, `eslint-plugin-react`, `babel-eslint` along with <https://github.com/samerbuna/.files/blob/master/.eslintrc.js>
- `nodemon` with script `nodemon start {filename} --watch --interpreter babel-node`
- `babel-cli` along with presets: `react`, `env`, `stage-2` (`babel-preset-react`, `babel-preset-env`, `babel-preset-stage-2`)

# Resources


- http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/ - babel with nodemon and react
- slack.jscomplete.com - slack of author of React courses
- https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
- https://app.pluralsight.com/library/courses/reactjs-advanced/table-of-contents 
  - https://github.com/jscomplete/advanced-react

# FAQ

- what is componentDidMount
- what is:
  - smart
  - dumb / presentational / stateless component: only handles UI, does not deal with state. State should be handled by higher level container components. They don't have access to local state.

# TODO

- do last two modules: https://app.pluralsight.com/library/courses/reactjs-advanced/table-of-contents
- https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents
  - do second module: Env Setup

# Redux

## Redux & React - how to connect

react-redux connects React container components with Redux store. 

- `connect` function creates container components and 

```
export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

mapStateToProps defines what parts of store should be exposed to component. It's first argument is `store`, and second is `ownProps` (properties passed to generated container components):

`mapStateToProps = (state, ownProps) => { return { something: ownProps.sth === state.sth } }`

`mapDispatchToProps` exposes actions that component can execute. There's three ways to define actions, most common is to use `bindActionCreators`:

`function mapDispatchToProps(dispatch, ownProps) { return { actions: bindActionsCreators(actions, dispatch) } }`

and in component use `this.props.actions.loadCourses()`

Container component will make state & dispatch to props + it will add 

- `Provider` components attaches application to Redux store. It provides redux store to all components automatically (via react context)

### Reselect library

Use is in mapStateToProps for caching, as reselect enables memoization: https://github.com/reactjs/reselect

## Folder structure

- store actions in `actions` folder. For each logical part, create separate actions file e.g. `courseActions.js`

This is action creator, type property is mandatory:

`export function createCourse(course) { return { type:' CREATE_COURSE', course }}`

- store reducers in `reducers` folder. 

This is a reducer (e.g. `courseReducer.js`) :

`export default function courseReducer(state = [], action) { switch(action.type) ... }`

Create a root reducer in `index.js`:

```
import {combineReducers} from 'redux'
import courses from './courseReducer'; // some reducer

const rootReducer = combineReducers({courses})

export default rootReducer;
```

Use `combineReducers`  for reducers composition.

## Three principles

- one immutable store / state tree (it stores data & ui state)
- actions trigger changes. Action is minimal representation of change to data. Structure must have `type` property. Components just dispatch actions and their work is done.
- reducers update store: state mutations are described by pure functions (reducers) & action

### Enforcing immutability

Use `redux-immutable-state-invariant`. Use is only in development.

or 

Use `Immutable.js`

or 

`deep-freeze`.

## Reducers

Functions that take current state and actions and return new state.

Each reducer is responsible for its slice of the state.

Reducers are pure functions!

A single action can be handled by all, some or none of reducers.

Reducer should initialize state if previous one is undefined:

```
const counter = (state = 0, action) => {
	case...
	default:
		return state;
}
```

## Actions & Action creators

Action creators are functions that create actions, e.g.

```
rateCourse(rating) { return { type: 'RATE_COURSE', rating } }
```

## Store API

- store.dispatch(action)
- store.subscribe(listener)
- store.getState()
- replaceReducer(nextReducer)
