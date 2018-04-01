# React router

`npm i react-router-dom`

```javascript
import { BrowserRouter as Router, Route } from "react-router-dom";

export default ({ store }) => {
  return (<Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>);
}
```
