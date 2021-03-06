//
// const BOOK_LISTS_HAS_ERRORED = 'BOOK_LISTS_HAS_ERRORED'
// const BOOK_LISTS_IS_LOADING = 'BOOK_LISTS_IS_LOADING'
// const BOOK_LISTS_FETCH_DATA_SUCCESS = 'BOOK_LISTS_FETCH_DATA_SUCCESS'

export const FETCH_BOOK_LISTS = 'FETCH_BOOK_LISTS'
export const FETCH_BOOK_LISTS_SUCCESS = 'FETCH_BOOK_LISTS_SUCCESS'
export const FETCH_BOOK_LISTS_ERRORED = 'FETCH_BOOK_LISTS_ERRORED'


// fetch the facet data for the query
export function fetchBookLists() {
  console.log("Fetch book lists")
  return {
    type: FETCH_BOOK_LISTS,
  }
}

// export function bookListsHasErrored(bool) {
//   return {
//     type: BOOK_LISTS_HAS_ERRORED,
//     hasErrored: bool
//   }
// }


// export function bookListsIsLoading(bool) {
//   return {
//     type: BOOK_LISTS_IS_LOADING,
//     isLoading: bool
//   }
// }
//
// export function bookListsFetchDataSuccess(bookLists) {
//   return {
//     type: BOOK_LISTS_FETCH_DATA_SUCCESS,
//     bookLists
//   }
// }
//
// export function errorAfterFiveSeconds() {
//   // we return a function instead of an action object
//   return (dispatch) => {
//     setTimeout( () => {
//       // this function is able to dispatch other action creaters
//       dispatch(bookListsHasErrored(true))
//     }, 5000)
//   }
// }
//
// export function bookListsFetchData(url) {
//     return (dispatch) => {
//         dispatch(bookListsIsLoading(true));
//         fetch(url, {
//           credentials: 'same-origin',
//           headers: {
//             Accept: 'application/json',
//           },
//           })
//             .then((response) => {
//                 if (!response.ok) {
//                     console.log('something went wrong');
//                     throw Error(response.statusText);
//                 }
//                 dispatch(bookListsIsLoading(false));
//                 return response;
//             })
//             .then((response) => response.json())
//             .then((books) => dispatch(bookListsFetchDataSuccess(books)))
//             .catch(function(err) {
//               console.log(err);
//               dispatch(bookListsHasErrored(true));
//             }
//             );
//     };
// }
