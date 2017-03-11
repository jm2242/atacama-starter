/**
  Action Creators

  These fire events which the reducer will handle
  We will later call these functions from inside our component

  Later these functions get bound to 'dispatch' fires the actual event
  Right now they just return an object

  It's a code convention to use all capitals and snake case for the event names
  We use const to store the name of the event so it is immutable

*/

export function booksHasErrored(bool) {
  return {
    type: 'BOOKS_HAS_ERRORED',
    hasErrored: bool
  }
}


export function booksIsLoading(bool) {
  return {
    type: 'BOOKS_IS_LOADING',
    isLoading: bool
  }
}

export function booksFetchDataSuccess(books) {
  return {
    type: 'BOOKS_FETCH_DATA_SUCCESS',
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
            .catch(() => dispatch(booksHasErrored(true)));
    };
}
