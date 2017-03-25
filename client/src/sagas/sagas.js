import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { ADD_BOOK_TO_BOOK_LIST } from '../actions/actionCreators'



// 1. worker saga - do the work, calling api , returning response
// 2. watcher saga  - listening for actions
// 3. root saga


// worker saga
export function* addBookToBookListAsync(action) {
  try {
    // call api
    console.log('SAGA: attempt to create a new book list via api')
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts')
    console.log(response)
  } catch (e) {
    // act on error
    console.log('there was an error')
  }
}


// watcher saga
export function* watchAddBookToBookList() {
  console.log('reduxsaga is running the watch add book list action listener')
  yield takeEvery(ADD_BOOK_TO_BOOK_LIST, addBookToBookListAsync)
}



// single entry point to start sagas at once
export default function* rootSaga() {
  yield [
    watchAddBookToBookList(),
  ]
}
