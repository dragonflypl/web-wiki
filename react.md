## React app

First decision to make is to decide on components structure. 

## React Components

Component needs to be mount in to the browser. `ReactDOM.render(component, placeToMountTheComponent)`.

Naming convention is to use title case for naming the components e.g. `Button`.

React component returns a description of user interface in the form of React element (`render` method or component function). 
Rendering of this React elements is done via `ReactDOM` library. 

### Function Component

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

> Use them only when you have a state to manage or personalized event handlers

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
    
    // or safer method: use it if you access previous state value
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

### Events

- `onSubmit` on form
- `onClick` on any

Any event handler receives `event` argument that is wrapper around native even object.

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

# Tools

- https://jscomplete.com/repl/ : playground
- react-devtools

# FAQ

- what is presentational component
