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
export const BOOKS_HAS_ERRORED = 'BOOKS_HAS_ERRORED'
export const BOOKS_IS_LOADING = 'BOOKS_IS_LOADING'
export const BOOKS_FETCH_DATA_SUCCESS = 'BOOKS_FETCH_DATA_SUCCESS'

export const STORE_QUERY = 'STORE_QUERY'
export const STORE_FULL_QUERY = 'STORE_FULL_QUERY'

export const INCREMENT_PAGE = 'INCREMENT_PAGE'


export const FACETS_FETCH_DATA = 'FACETS_FETCH_DATA'
export const FACETS_FETCH_DATA_ERRORED = 'FACETS_FETCH_DATA_ERRORED'
export const FACETS_FETCH_DATA_SUCCESS = 'FACETS_FETCH_DATA_SUCCESS'

export const ADD_FACET = 'ADD_FACET'
export const REMOVE_FACET = 'REMOVE_FACET'


export const EDIT_BOOK_LIST_NAME = 'EDIT_BOOK_LIST_NAME'
export const EDIT_BOOK_LIST_NAME_SUCCESS = 'EDIT_BOOK_LIST_NAME_SUCCESS'
export const EDIT_BOOK_LIST_NAME_ERRORED = 'EDIT_BOOK_LIST_NAME_ERRORED'


export const DELETE_BOOK_LIST = 'DELETE_BOOK_LIST'
export const DELETE_BOOK_LIST_SUCCESS = 'DELETE_BOOK_LIST_SUCCESS'
export const DELETE_BOOK_LIST_ERRORED = 'DELETE_BOOK_LIST_ERRORED'

export const CREATE_BOOK_LIST = 'CREATE_BOOK_LIST'
export const CREATE_BOOK_LIST_SUCCESS = 'CREATE_BOOK_LIST_SUCCESS'
export const CREATE_BOOK_LIST_ERRORED = 'CREATE_BOOK_LIST_ERRORED'


export const ADD_BOOK_TO_BOOK_LIST = 'ADD_BOOK_TO_BOOK_LIST'
export const ADD_BOOK_TO_BOOK_LIST_ERRORED = 'ADD_BOOK_TO_BOOK_LIST_ERRORED'
export const ADD_BOOK_TO_BOOK_LIST_SUCCESS = 'ADD_BOOK_TO_BOOK_LIST_SUCCESS'


export const DELETE_BOOK_FROM_BOOK_LIST = 'DELETE_BOOK_FROM_BOOK_LIST'
export const DELETE_BOOK_FROM_BOOK_LIST_ERRORED = 'DELETE_BOOK_FROM_BOOK_LIST_ERRORED'
export const DELETE_BOOK_FROM_BOOK_LIST_SUCCESS = 'DELETE_BOOK_FROM_BOOK_LIST_SUCCESS'


// fetch the facet data for the query
export function facetsFetchData(url) {
  console.log("Fetch Facet Options action")
  return {
    type: FACETS_FETCH_DATA,
    url
  }
}

// store the user query for later use
export function storeQuery(query) {
  return {
    type: STORE_QUERY,
    query
  }
}

// store the full query for use with page offsets
export function storeFullQuery(query) {
  return {
    type: STORE_FULL_QUERY,
    query
  }
}

// keep track of checked facets
export function addFacet(facetName, facetValue) {
  console.log("Add facet action ")
  return {
    type: ADD_FACET,
    facetName,
    facetValue
  }
}

// remove unchecked facet
export function removeFacet(facetName, facetValue) {
  console.log("remove facet action")
  return {
    type: REMOVE_FACET,
    facetName,
    facetValue
  }
}

export function incrementCurrentPage(amount) {
  return {
    type: INCREMENT_PAGE,
    amount
  }
}

// add a book to a book list action
export function addBookToBookListSaga(book, bookListId) {
  console.log("addBookToBOOKList action")
  return {
    type: ADD_BOOK_TO_BOOK_LIST,
    book,
    bookListId
  }
}

// delete a book from a book list action
export function deleteBookFromBookList(bookId, bookListId) {
  console.log('dispatching delete book from book list action')
  return {
    type: DELETE_BOOK_FROM_BOOK_LIST,
    bookId,
    bookListId
  }
}

// edit the book list name
export function editBookListName(newListName, bookListId) {
  console.log('dispatching delete book from book list action')
  return {
    type: EDIT_BOOK_LIST_NAME,
    newListName,
    bookListId
  }
}

// delete book list
export function deleteBookList(bookListId) {
  console.log('dispatching delete book list action')
  return {
    type: DELETE_BOOK_LIST,
    bookListId
  }
}

// edit the book list name
export function createBookList() {
  console.log('dispatching delete book from book list action')
  return {
    type: CREATE_BOOK_LIST,
  }
}


// BEGIN POST LIST name

export function postBookListName(listName, bookListId) {
    return (dispatch) => {
        console.log(bookListId)
        const url = 'api/book-lists/' + bookListId;
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': listName
          })
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




// comment out dispatch delete book for now
export function postDeleteBook(bookId, bookListId) {
    return (dispatch) => {
        console.log(bookListId)
        //dispatch(deleteBookFromBookList(bookId));
        const url = 'api/book-lists/' + bookListId + '/books/' + bookId
        fetch(url, {
          method: 'DELETE',
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
