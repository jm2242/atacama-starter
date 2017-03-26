import { createSelector } from 'reselect'

const getBookLists = (state) => state.bookLists

//
// export const getBookListNames = createSelector(
//   [ getBookLists ],
//   ( bookLists ) => {
//     return bookLists.map(bl => bl.name)
//   }
// )

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
