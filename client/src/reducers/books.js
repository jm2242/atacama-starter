import {
  FACETS_FETCH_DATA_SUCCESS,
  REMOVE_FACET,
  ADD_FACET,
  STORE_QUERY,
  STORE_FULL_QUERY,
  INCREMENT_PAGE
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

export function storeQuery(state = '', action) {
    switch (action.type) {
        case STORE_QUERY:
            return action.query
        default:
            return state;
    }
}

export function storeFullQuery(state = '', action) {
    switch (action.type) {
        case STORE_FULL_QUERY:
            return action.query
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

// update the selected facets
export function selectedFacets(state = [], action) {
    switch (action.type) {
        case REMOVE_FACET:
          return state.filter(facet => facet.facetName !== action.facetName && facet.facetValue !== action.facetValue)
        case ADD_FACET:
          return [...state, {
            facetName: action.facetName,
            facetValue: action.facetValue
          }]
        default:
            return state;
    }
}

export function currentPage(state = 0, action) {
  switch (action.type) {
    case INCREMENT_PAGE:
      if (state + action < 0) {
        return state
      }
      return (parseInt(state, 10) + parseInt(action.amount, 10))
    default:
      return state
  }
}
