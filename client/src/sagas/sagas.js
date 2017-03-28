import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  ADD_BOOK_TO_BOOK_LIST,
  ADD_BOOK_TO_BOOK_LIST_SUCCESS,
  ADD_BOOK_TO_BOOK_LIST_ERRORED,
  DELETE_BOOK_FROM_BOOK_LIST,
  DELETE_BOOK_FROM_BOOK_LIST_ERRORED,
  DELETE_BOOK_FROM_BOOK_LIST_SUCCESS
} from '../actions/actionCreators'


// General stuff about Sagas:
// 1. worker saga - do the work, calling api , returning response
// 2. watcher saga  - listening for actions
// 3. root saga

//--------BEGIN Add book to Book lists------------//

// worker saga
export function* addBookToBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to create a new book list via api')
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



// single entry point to start sagas at once
export default function* rootSaga() {
  yield [
    watchAddBookToBookList(),
    watchDeleteBookFromBookList()
  ]
}
