import {
  FACETS_FETCH_DATA_SUCCESS
} from '../actions/actionCreators'

export function booksHasErrored(state = false, action) {
    switch (action.type) {
        case 'BOOKS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function booksIsLoading(state = false, action) {
    switch (action.type) {
        case 'BOOKS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function books(state = [], action) {
    switch (action.type) {
        case 'BOOKS_FETCH_DATA_SUCCESS':
            return action.books;
        default:
            return state;
    }
}

// reducer for the facets
export function facets(state = [], action) {
    switch (action.type) {
        case FACETS_FETCH_DATA_SUCCESS:
          return action.facets
        default:
            return state;
    }
}
