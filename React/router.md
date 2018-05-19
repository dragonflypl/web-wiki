# React router

`npm i react-router-dom`

```javascript
import { BrowserRouter as Router, Route } from "react-router-dom";

export default ({ store }) => {
  return (<Provider store={store}>
    <Router>
      <Route path='/:filter?' component={App} />
    </Router>
  </Provider>);
}
```

## Route params

`Route` component specifies component to be rendered when `path` is matched.

Each routed component (e.g. `App`) receives `match` property from the router:

`<VisibleTodoList visibilityFilter={this.props.match.params.filter} />`

Another way to access route params is HoC `import { withRouter } from 'react-router'`. This HoC will inject `match` as the property to wrapped component:

```javascript
// now ownProps contains match property
const mapStateToProps = ({ todos }, { match }) => {
  const visibilityFilter = match.params.filter || 'all';
  return {
    todos: todos.filter(x => {
      return (visibilityFilter === 'all') ||
        (visibilityFilter === 'completed' && x.completed) ||
        (visibilityFilter === 'active' && !x.completed);
    })
  }
}
```

### Params

`:paramName` is the syntax for specifing route parameters.

### Optional params

`<Route path='/:filter?' component={App} />` - add `?` after param name to make it optional.

## Navigation links

Simple as that, use `NavLink`:

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FilterLink({ filter, ...rest }) {
  return <NavLink activeStyle={{
    textDecoration: 'none',
    color: 'black'
  }} to={'/' + filter} {...rest} />
}
```
