import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // we need this for react-router
import { reducer as formReducer } from 'redux-form'
import { books, booksHasErrored, booksIsLoading, facets, selectedFacets, storeQuery, storeFullQuery, currentPage, recentBooks } from './books'
import { bookLists, bookListsHasErrored, bookListsIsLoading } from './bookLists'
import { login, loginHasErrored, loginIsLoading } from './login'
import { uiReducer } from './ui-reducers'

/*
  Reducers

  Reducers match up the dispatched (fired) action with a function that should be called.

  It takes in a copy of state, modifies it, and returns the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state

*/



// ES6 shorthand when passing in reducers ex would be books: books, booksHasErrored: booksHasErrored
const rootReducer = combineReducers({form: formReducer, ui: uiReducer, login, loginHasErrored, loginIsLoading, books, booksHasErrored, booksIsLoading, bookLists, bookListsHasErrored, bookListsIsLoading, facets, selectedFacets, storeQuery, storeFullQuery, currentPage, recentBooks, routing: routerReducer });

export default rootReducer;
