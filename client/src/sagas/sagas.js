import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  EDIT_BOOK_LIST_NAME,
  EDIT_BOOK_LIST_NAME_SUCCESS,
  EDIT_BOOK_LIST_NAME_ERRORED,
  ADD_BOOK_TO_BOOK_LIST,
  ADD_BOOK_TO_BOOK_LIST_SUCCESS,
  ADD_BOOK_TO_BOOK_LIST_ERRORED,
  DELETE_BOOK_FROM_BOOK_LIST,
  DELETE_BOOK_FROM_BOOK_LIST_ERRORED,
  DELETE_BOOK_FROM_BOOK_LIST_SUCCESS,
  FACETS_FETCH_DATA,
  FACETS_FETCH_DATA_SUCCESS,
  FACETS_FETCH_DATA_ERRORED,
  CREATE_BOOK_LIST,
  CREATE_BOOK_LIST_SUCCESS,
  CREATE_BOOK_LIST_ERRORED,
  DELETE_BOOK_LIST,
  DELETE_BOOK_LIST_SUCCESS,
  DELETE_BOOK_LIST_ERRORED,
  FETCH_RECENT_BOOKS,
  FETCH_RECENT_BOOKS_SUCCESS,
  FETCH_RECENT_BOOKS_ERRORED
} from '../actions/actionCreators'

import {
  FETCH_BOOK_LISTS,
  FETCH_BOOK_LISTS_SUCCESS,
  FETCH_BOOK_LISTS_ERRORED
} from '../actions/bookListActions'

import { facetsApi, recentBooksApi, bookListsApi } from './api'

// General stuff about Sagas:
// 1. worker saga - do the work, calling api , returning response
// 2. watcher saga  - listening for actions
// 3. root saga

//--------BEGIN Add book to Book lists------------//

// worker saga
export function* addBookToBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to add book to book list')
    const bookListId = action.bookListId
    const bookId = action.book.id
    const url = 'api/book-lists/' + bookListId + '/books/' + bookId


    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.log(response)

    yield put({type: ADD_BOOK_TO_BOOK_LIST_SUCCESS, book: action.book, bookListId: action.bookListId })

  } catch (e) {
    // act on error
    console.log('Could not add book to book list')
    console.log(e)
    yield put({type: ADD_BOOK_TO_BOOK_LIST_ERRORED, message: e.message })

  }
}

// watcher saga
export function* watchAddBookToBookList() {
  yield takeEvery(ADD_BOOK_TO_BOOK_LIST, addBookToBookListAsync)
}

//--------END Add book to Book lists------------//

//--------BEGIN delete book from Book lists------------//

// watcher saga
export function* watchDeleteBookFromBookList() {
  yield takeEvery(DELETE_BOOK_FROM_BOOK_LIST, deleteBookFromBookListAsync)
}

// worker saga
export function* deleteBookFromBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to delete a book from a book list via api')

    // get parameters from action
    const bookListId = action.bookListId
    const bookId = action.bookId
    const url = 'api/book-lists/' + bookListId + '/books/' + bookId


    const response = yield call(fetch, url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    console.log(response)

    yield put({type: DELETE_BOOK_FROM_BOOK_LIST_SUCCESS, bookId, bookListId })

  } catch (e) {
    // act on error
    console.log('Could not delete book from book list')
    console.log(e)
    yield put({type: DELETE_BOOK_FROM_BOOK_LIST_ERRORED, message: e.message })

  }
}

//--------BEGIN edit book list name------------//

// watcher saga
export function* watchEditBookListName() {
  yield takeEvery(EDIT_BOOK_LIST_NAME, editBookListNameAsync)
}

// worker saga
export function* editBookListNameAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to edit a book list name')

    // get parameters from action
    const bookListId = action.bookListId
    const newListName = action.newListName
    const url = 'api/book-lists/' + bookListId;


    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': newListName
      })
    })
    console.log(response)

    yield put({type: EDIT_BOOK_LIST_NAME_SUCCESS, newListName, bookListId })

  } catch (e) {
    // act on error
    console.log('Could not edit book list name')
    console.log(e)
    yield put({type: EDIT_BOOK_LIST_NAME_ERRORED, message: e.message })

  }
}
//-------- END edit book list name

//--------BEGIN new book list------------//

// watcher saga
export function* watchNewBookList() {
  yield takeEvery(CREATE_BOOK_LIST, newBookListAsync)
}

// worker saga
export function* newBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to edit a book list name')

    const url = 'api/book-lists/'


    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': action.name,
        'description': action.description
      })
    })
    console.log(response)

    yield put({type: FETCH_BOOK_LISTS})

  } catch (e) {
    // act on error
    console.log('Could not edit book list name')
    console.log(e)
    yield put({type: CREATE_BOOK_LIST_ERRORED, message: e.message })

  }
}
//-------- END new book list

//-------- END edit book list name

//--------BEGIN delete book list------------//

// watcher saga
export function* watchDeleteBookList() {
  yield takeEvery(DELETE_BOOK_LIST, deleteBookListAsync)
}

// worker saga
export function* deleteBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to edit a book list name')
    const bookListId = action.bookListId
    const url = 'api/book-lists/' + bookListId
    console.log(url)


    const response = yield call(fetch, url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)

    yield put({type: DELETE_BOOK_LIST_SUCCESS, bookListId})

  } catch (e) {
    // act on error
    console.log('Could not edit book list name')
    console.log(e)
    yield put({type: DELETE_BOOK_LIST_ERRORED, message: e.message })

  }
}
//-------- END delete book list

//--------BEGIN fetch search query facets------------//
// watcher saga
export function* watchGetFacets() {
  yield takeEvery(FACETS_FETCH_DATA, getFacetsAsync)
}

// worker saga
export function* getFacetsAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to fetch facets')


    const facets = yield facetsApi(action.url)
    yield put({type: FACETS_FETCH_DATA_SUCCESS, facets })

  } catch (e) {
    // act on error
    console.log('Could not delete book from book list')
    console.log(e)
    yield put({type: FACETS_FETCH_DATA_ERRORED, message: e.message })

  }
}

//--------BEGIN fetch recent books ------------//
// watcher saga
export function* watchGetRecentBooks() {
  yield takeEvery(FETCH_RECENT_BOOKS, getRecentBooksAsync)
}

// worker saga
export function* getRecentBooksAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to fetch recent books')


    const recentBooks = yield recentBooksApi(action.url)
    yield put({type: FETCH_RECENT_BOOKS_SUCCESS, recentBooks })

  } catch (e) {
    // act on error
    console.log('Could not delete book from book list')
    console.log(e)
    yield put({type: FETCH_RECENT_BOOKS_ERRORED, message: e.message })

  }
}
//------ END fetch recent books

//--------BEGIN get book lists------------//
// watcher saga
export function* watchGetBookLists() {
  yield takeEvery(FETCH_BOOK_LISTS, getBookListsAsync)
}

// worker saga
export function* getBookListsAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to fetch book lists')

    const url = '/api/book-lists'
    const bookLists = yield bookListsApi(url)
    console.log(bookLists)
    yield put({type: FETCH_BOOK_LISTS_SUCCESS, bookLists })

  } catch (e) {
    // act on error
    console.log('Could not get book lists')
    console.log(e)
    yield put({type: FETCH_BOOK_LISTS_ERRORED, message: e.message })

  }
}

// single entry point to start sagas at once
export default function* rootSaga() {
  yield [
    watchAddBookToBookList(),
    watchDeleteBookFromBookList(),
    watchGetFacets(),
    watchEditBookListName(),
    watchNewBookList(),
    watchDeleteBookList(),
    watchGetRecentBooks(),
    watchGetBookLists()
  ]
}
