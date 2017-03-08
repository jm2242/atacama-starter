
/*
  Import Dependencies
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router'
import 'babel-polyfill'

/*
  Import Components
*/
import App from './components/App';
// import Single from './components/Single';
// import PhotoGrid from './components/PhotoGrid';

/* Import CSS */
// import css from  './styles/style.styl';

/* Import our data store */
import store, { history } from './store';


/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/
ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
