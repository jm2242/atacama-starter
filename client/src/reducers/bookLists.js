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
            return action.books;
        default:
            return state;
    }
}
