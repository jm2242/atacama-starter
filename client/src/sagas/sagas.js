import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import {
  ADD_BOOK_TO_BOOK_LIST,
  ADD_BOOK_TO_BOOK_LIST_SUCCESS,
  ADD_BOOK_TO_BOOK_LIST_ERRORED,

} from '../actions/actionCreators'



// 1. worker saga - do the work, calling api , returning response
// 2. watcher saga  - listening for actions
// 3. root saga


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
  console.log('reduxsaga is running the watch add book list action listener')
  yield takeEvery(ADD_BOOK_TO_BOOK_LIST, addBookToBookListAsync)
}

// watcher saga
// export function* watchGetBookLists() {
//   console.log('reduxsaga: watch get book lists listener')
//   yield takeEvery(ADD_BOOK_TO_BOOK_LIST, addBookToBookListAsync)
// }



// single entry point to start sagas at once
export default function* rootSaga() {
  yield [
    watchAddBookToBookList(),
    // watchGetBookLists(),
  ]
}
