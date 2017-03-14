//@flow
/**
  Action Creators

  These fire events which the reducer will handle
  We will later call these functions from inside our component

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/

// Action type constants
const BOOKS_HAS_ERRORED = 'BOOKS_HAS_ERRORED'
const BOOKS_IS_LOADING = 'BOOKS_IS_LOADING'
const BOOKS_FETCH_DATA_SUCCESS = 'BOOKS_FETCH_DATA_SUCCESS'

const ADD_BOOK_TO_BOOK_LIST = 'ADD_BOOK_TO_BOOK_LIST'
const ADD_BOOK_TO_BOOK_LIST_ERRORED = 'ADD_BOOK_TO_BOOK_LIST_ERRORED'
const ADD_BOOK_TO_BOOK_LIST_SUCCESS = 'ADD_BOOK_TO_BOOK_LIST_SUCCESS'



// Book list actions
export function addBookToBookList(book) {
  return {
    type: ADD_BOOK_TO_BOOK_LIST,
    book
  }
}

// export function addBookToBookListSuccess(res) {
//   return {
//     type: ADD_BOOK_TO_BOOK_LIST_SUCCESS,
//     res
//   }
// }
//
// export function addBookToBookListErrored(bool) {
//   return {
//     type: ADD_BOOK_TO_BOOK_LIST_ERRORED,
//     hasErrored: bool
//   }
// }

export function postBooktoBookList(book, bookListId) {
    return (dispatch) => {
        console.log(bookListId)
        dispatch(addBookToBookList(book));
        const bookId = book.id
        const url = 'api/book-lists/' + bookListId + '/books/' + bookId
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                //dispatch(booksIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            //.then((res) => dispatch(addBookToBookListSuccess(res)))
            .catch(function (err) {
              console.log(err);
              //dispatch(addBookToBookListErrored(true));
            }
          );
    };
}


//------- BEGIN GET BOOKS ACTION CREATORS --------


// Action creators
export function booksHasErrored(bool) {
  return {
    type: BOOKS_HAS_ERRORED,
    hasErrored: bool
  }
}


export function booksIsLoading(bool) {
  return {
    type: BOOKS_IS_LOADING,
    isLoading: bool
  }
}

export function booksFetchDataSuccess(books) {
  return {
    type: BOOKS_FETCH_DATA_SUCCESS,
    books
  }
}

export function errorAfterFiveSeconds() {
  // we return a function instead of an action object
  return (dispatch) => {
    setTimeout( () => {
      // this function is able to dispatch other action creaters
      dispatch(booksHasErrored(true))
    }, 5000)
  }
}

export function booksFetchData(url) {
    return (dispatch) => {
        dispatch(booksIsLoading(true));
        fetch(url, {
          headers: {
            Accept: 'application/json',
          },
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(booksIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((books) => dispatch(booksFetchDataSuccess(books)))
            .catch(function (err) {
              console.log(err);
              dispatch(booksHasErrored(true));
            }
          );
    };
}
//------- END GET BOOKS ACTION CREATORS --------
