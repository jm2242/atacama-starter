
/*
  Import Dependencies
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill'

// import flexboxgrid for all components to use
import './styles/flexboxgrid.css'


/*
  Import Components
*/
import App from './components/App';
import Home from './components/Home'
import NotFoundPage from './components/NotFoundPage'
import BookList from './containers/BookList'

/* Import CSS */
// import css from  './styles/style.styl';

/* Import our data store */
import store, { history } from './store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/*
  Rendering
  This is where we hook up the Store with our actual component and the router
*/
ReactDOM.render(
  <MuiThemeProvider>
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/booklist" component={BookList} />
        {/* <Redirect from="login" to="/auth/google" /> */}
        {/* Catch all routes that don't match  */}
        {/* <Route path='*' component={NotFoundPage}/> */}
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
