import { createSelector } from 'reselect'

/*
Use Reselect to create memoized, composable selector functions
Allows to compute derived data from redux store
*/


const getBookLists = (state) => state.bookLists


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
