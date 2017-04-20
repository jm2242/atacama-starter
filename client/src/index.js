
/*
  Import Dependencies
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import 'babel-polyfill'

// material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import flexboxgrid for all components to use
import './styles/flexboxgrid.css'
import './styles/index.css'

/*
  Import Components
*/
import App from './containers/App';
import Home from './components/Home'
import NotFoundPage from './components/NotFoundPage'
import BookLists from './containers/BookLists'
import Login from './containers/Login'
import Reader from './containers/Reader'


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
        <Route path="/login" component={Login} />
        <Route path="/booklist" component={BookLists} />
        <Route path="/reader/:bookId" component={Reader} />
        {/* <Route path="/vis" component={Vis} /> */}

        <Redirect from="/auth/google/*" to="/" />
        {/* Catch all routes that don't match  */}
        <Route path='*' component={NotFoundPage}/>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
