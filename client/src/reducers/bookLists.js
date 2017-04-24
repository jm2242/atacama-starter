import { EDIT_BOOK_LIST_NAME_SUCCESS } from '../actions/actionCreators'

export function bookListsHasErrored(state = false, action) {
    switch (action.type) {
        case 'BOOK_LISTS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function bookListsIsLoading(state = false, action) {
    switch (action.type) {
        case 'BOOK_LISTS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
export function bookLists(state = [], action) {
    switch (action.type) {
        case 'BOOK_LISTS_FETCH_DATA_SUCCESS':
            return action.bookLists;
        case 'ADD_BOOK_TO_BOOK_LIST_SUCCESS':
          const book = action.book
          console.log('current state:')
          console.log(state)
          console.log(action.bookListId)
          // we need to return a new state with object with the book appended
          // to the book attribute of the correct booklist
          return state.map( (bookList, index) => {

            // match the correct book list
            if (bookList.id === action.bookListId) {

              // first make sure the book isn't already in the list
              for (let b of bookList.books) {
                if (b.id === book.id) {
                  console.log('this book is already in teh book list')
                  return bookList
                }
              }

              // otherwise return a new book list with book appended
              return Object.assign({}, bookList, {
                books: bookList.books.concat(book)
              })
            } else {
              return bookList
            }

          })

        case 'DELETE_BOOK_FROM_BOOK_LIST_SUCCESS':
          console.log('in del suc reducer')
          console.log(action.bookId)
            // we need to return a new state with the book removed from the bookList
            // with the specified id
          return state.map( (bookList, index) => {
            if (bookList.id === action.bookListId) {
              return Object.assign({}, bookList, {

                // we filter over the bookList's books, leaving the books
                // that don't have a matching id
                books: bookList.books.filter( book => book.id !== action.bookId)
              })
            } else {
              return bookList
            }
          })

        case EDIT_BOOK_LIST_NAME_SUCCESS:
          const newListName = action.newListName
          //const bookListId = action.bookListId

          return state.map( (bookList, index) => {

            // match the correct book list
            if (bookList.id === action.bookListId) {

              //  return a new book list with new name
              return Object.assign({}, bookList, {
                name: newListName
              })
            } else {
              return bookList
            }

          })


        default:
          return state
    }
}







//
// export function postBookList(bookId) {
//
//   fetch(/api/, {
//     headers: {
//       Accept: 'application/json',
//     },
//     })
//       .then((response) => {
//           if (!response.ok) {
//               throw Error(response.statusText);
//           }
//           dispatch(booksIsLoading(false));
//           return response;
//       })
//       .then((response) => response.json())
//       .then((books) => dispatch(booksFetchDataSuccess(books)))
//       .catch(function (err) {
//         console.log(err);
//       }
//     );
//
// }
