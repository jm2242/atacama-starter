import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // we need this for react-router

import { books, booksHasErrored, booksIsLoading } from './books'
import { bookLists, bookListsHasErrored, bookListsIsLoading } from './bookLists'

/*
  Reducers

  Reducers match up the dispatched (fired) action with a function that should be called.

  It takes in a copy of state, modifies it, and returns the new state
  When state gets large, it makes sense to have multiple reducers that only deal with a piece of the state

*/



// ES6 shorthand when passing in reducers ex would be books: books, booksHasErrored: booksHasErrored
const rootReducer = combineReducers({books, booksHasErrored, booksIsLoading, bookLists, bookListsHasErrored, bookListsIsLoading, routing: routerReducer });

export default rootReducer;
