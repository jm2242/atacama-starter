import React, { Component } from 'react';

import DeleteBookListDialog from '../components/DeleteBookListDialog'
import EditBookListNameDialog from '../components/EditBookListNameDialog'


export default class BookListButtonBar extends Component {
  render() {
    const { bookList } = this.props
    return (
      <div className="row center-xs">
        <EditBookListNameDialog
          bookList={bookList}
          postBookListName={this.props.postBookListName}
        />
        <DeleteBookListDialog
          bookList={bookList}
        />
      </div>
    )
  }
}


// const mapStateToProps = (state) => {
//     return {
//         hasErrored: state.bookListsChangeHasErrored,
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//       postData: (listName, bookListId) => dispatch(postBookListName(listName, bookListId))
//   };
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(BookListButtonBar);
