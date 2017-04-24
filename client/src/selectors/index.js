import { createSelector } from 'reselect'

/*
Use Reselect to create memoized, composable selector functions
Allows to compute derived data from redux store
*/


const getBookLists = (state) => state.bookLists

const getSelectedFacets = (state) => state.selectedFacets


// we need the book list names in a part of our app, so we use this selector
// to efficeintly get the names
export const getBookListNames = createSelector(
  [ getBookLists ],
  ( bookLists ) => {
    return bookLists.map( function(bl) {
      return  {
        'bookListName': bl.name,
        'bookListId': bl.id
      }
    }
  )
  }
)


// get all of the facets to construct the new search url
export const constructFacetUrl = createSelector(
  [ getSelectedFacets ],
  ( facets ) => {
    return facets.map(
      (facet) => '&fq.' + facet.facetName + '=' + facet.facetValue
    ).join('')
  }
)
