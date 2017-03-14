
const BOOK_LISTS_HAS_ERRORED = 'BOOK_LISTS_HAS_ERRORED'
const BOOK_LISTS_IS_LOADING = 'BOOK_LISTS_IS_LOADING'
const BOOK_LISTS_FETCH_DATA_SUCCESS = 'BOOK_LISTS_FETCH_DATA_SUCCESS'


export function bookListsHasErrored(bool) {
  return {
    type: BOOK_LISTS_HAS_ERRORED,
    hasErrored: bool
  }
}


export function bookListsIsLoading(bool) {
  return {
    type: BOOK_LISTS_IS_LOADING,
    isLoading: bool
  }
}

export function bookListsFetchDataSuccess(bookLists) {
  return {
    type: BOOK_LISTS_FETCH_DATA_SUCCESS,
    bookLists
  }
}

export function errorAfterFiveSeconds() {
  // we return a function instead of an action object
  return (dispatch) => {
    setTimeout( () => {
      // this function is able to dispatch other action creaters
      dispatch(bookListsHasErrored(true))
    }, 5000)
  }
}

export function bookListsFetchData(url) {
    return (dispatch) => {
        dispatch(bookListsIsLoading(true));
        fetch(url, {
          headers: {
            Accept: 'application/json',
          },
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(bookListsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((books) => dispatch(bookListsFetchDataSuccess(books)))
            .catch(() => dispatch(bookListsHasErrored(true)));
    };
}
