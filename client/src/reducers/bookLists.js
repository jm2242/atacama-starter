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
        case 'ADD_BOOK_TO_BOOK_LIST':
          console.log("logging from book reducer");
          console.log(state);
          console.log(action);

          // this is hacky, we first need to get the book lists
          if (!state) {
            return state
          }
          else {
            const newState = state
            newState[0].books.push(action.book)
            console.log('newstate:')
            console.log(newState)
            return newState
          }
        default:
            return state;
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
