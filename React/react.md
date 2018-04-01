
## React app

First decision to make is to decide on components structure. 

## React Components

Component needs to be mount in to the browser. `ReactDOM.render(component, placeToMountTheComponent)`.

Naming convention is to use title case for naming the components e.g. `Button`.

React component returns a description of user interface in the form of React element (`render` method or component function). 
Rendering of this React elements is done via `ReactDOM` library. 

### Container components

A components that does anything beside presenting UI is known as a container component `ArticleContainer`:

```javascript
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

### Higher-order component (function)

> Check out this ultimate guide: <https://medium.freecodecamp.org/higher-order-components-the-ultimate-guide-b453a68bb851>

HoC is a function that takes a components and returns new one.

It is a technique from FP (higher-order functions). Just as the higher-order function creates a new function, the HoC creates a new component.

HoC is a  **function**  that  **accepts**  **a component**  and  **returns a new component that renders the passed one**.  This new component is enhanced with an additional functionality.

> const HoC = BaseComponent => EnhancedComponent

`recompose` is a library that enables HoC composition and provides dozens of generic HoC.

 (usually this is a generic function that generates a container components from presntational components):

```javascript
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

```javascript
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

```javascript
const Button = () => {
  return (
    <button>Go</button>
  )
}
```

To mount this component: `ReactDOM.render(<Button />, mountNode)`.

To use props, add argument and use props in JSX using `{}`

```javascript
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

```javascript
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

#### Theming

react-toolbox is great example of how theming can be done with css modules.

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

```javascript
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

```javascript
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

Just define `getChildContext` & `childContextTypes` in parent + `contextTypes` in child, and second argument of components constructor will be context (for functional components) or `this.context` (for class components):

```javascript
function SomeComponent(props, context) {}
```

Using Context API explicitly is tricky, and at least makes testing harder (global dependency). To address some of the issues while testing, use Enzyme that does shalow rendering (react-test-renderer is tree renderer).

Don't use it, unless you're using some kind of provider component along with HoC that binds context with base component's props.

## Type checking

It's possible to guard against invalid properties passed to components with `PropTypes`:

```javascript
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

- `react-test-renderer` - for snapshots
- `enzyme` - for interaction. `shallow` does not render children. To test lifecycle methods and children interaction, use `mount`. 
- `react-addons-test-utils` - used by enzyme

### Types of testing

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

### Snapshot testing

Renderer can be used to do it;

```javascript
import renderer from 'react-test-renderer'
const tree = renderer.create(<div>Hello</div>).toJSON()
expect(tree).toMatchSnapshot();
```

You can use enzyme with this rendered to test shapshots of only parts of components.

# Tools

- `jest`
- https://jscomplete.com/repl/ : playground
- react-devtools
- https://github.com/axios/axios
- https://github.com/facebook/create-react-app : create react app
- `eslint`, `eslint-plugin-react`, `babel-eslint` along with <https://github.com/samerbuna/.files/blob/master/.eslintrc.js>
- `nodemon` with script `nodemon start {filename} --watch --interpreter babel-node`
- `babel-cli` along with presets: `react`, `env`, `stage-2` (`babel-preset-react`, `babel-preset-env`, `babel-preset-stage-2`)

# Creating reusable components

## Styling

### React Inline styles

You can write styles as javascript objects. However, even though it has some benefis (styles can be dynamic, deterministic), it does not support more advances features (autoprefixing, animations, media queries, pseudoclasses etc...)

### Naming Scheme (e.g. BEM)

Use BEM for creating class names that won't collide with / leak out from comonents.

### CSS Modules

Use CSS Modules - they work like BEM out of the box. Just enable modules in `css-loader`

Now you can do really short class names and be safe that no collision will happen.

If you enable modules, you need to use it in whole application.

### CSS in JS

I'm interested in it. If my mind changes check `styled-components`.

## Architecture

Atoms -> Molecules -> Ogranisms

### Atom

Button, Label etc. - this is basic building block.

Each component code (js/styles/tests) in it's folder inside `components` folder (this is used by almost all component libraries) e.g.:

`https://github.com/react-toolbox/react-toolbox/tree/dev/components/dropdown`

Hints:

- when wrapping elements, honor native API (make props have the same names as native DOM elements like className, value, maxLength)
- for arrays, use plurals (users), not suffixes (userList)
- use spread operator (with desctucturing `{ name, ...rest}` ) to pass props `{...props}` when possible
- create formatting components! (`<Cash>6</Cash>` -> `$6`)

### Organisms

Make them dumb, do not create mini apps.

Organisms still should not make any API calls. They still should receive data via props.

Otherwise they can lead to overfetching and displaying out of sync data and other problems.

## Environment

### General boilerplate

- create-react-app : application oriented

```
npm i -g create-react-app
# will create app in current directory
create-react-app ./
# for ejecting
npm run eject
```

- nwb : single component oriented
- list of other boilerplates: https://www.javascriptstuff.com/react-starter-projects/

### Documentation tool

- react storybook
- react styleguide
- react-styleguide-generator
- bluekit

### Custom documentation app

With `react-docgen`.

# Resources

- <https://github.com/ReactTraining> : interesting repos
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

- read https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578
- do last two modules: https://app.pluralsight.com/library/courses/reactjs-advanced/table-of-contents
- https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents
  - do second module: Env Setup
