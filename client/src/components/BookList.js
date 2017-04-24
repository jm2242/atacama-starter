import React from 'react';

import { connect } from 'react-redux'
import { deleteBookFromBookList, editBookListName } from '../actions/actionCreators'

import BookListButtonBar from '../containers/BookListButtonBar'


// Material UI imports
//import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MobileTearSheet from './MobileTearSheet'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { red500 } from 'material-ui/styles/colors';


//import Divider from 'material-ui/Divider';
//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';



const BookList = React.createClass({

  handleClick(bookId, bookListId) {
    this.props.deleteBook(bookId, bookListId)
  },

  render() {

    const bookList = this.props.bookList

    if (bookList) {
      return (
          <div className="center-xs">
            <MobileTearSheet>
              <List>
                <Subheader>{bookList.name}</Subheader>

                {/* List out the books in the book list  */}
                {bookList.books.map((book,i) =>
                  <ListItem
                    key={i}
                    primaryText={book.title}
                    rightIconButton={ <IconButton>
                      <ContentClear
                        onClick={() => this.handleClick(book.id, bookList.id)}
                        hoverColor={red500} />
                      </IconButton>
                    }
                  />
                )}
              </List>
              <Divider />
              <BookListButtonBar
                bookList={bookList}
                postBookListName={this.props.postBookListName}
              />
              <Divider />

            </MobileTearSheet>
            {/* <span>
              <TextField hintText="Change Book List Name" />
            </span>
            <span>
              <RaisedButton label="save" primary={true}/>
            </span> */}
            {/* <BookListNameForm bookListId={bookList.id} /> */}

        </div>
      )
    }
    return <div></div>
  }
})



const mapStateToProps = (state) => {
    return {
        hasErrored: state.bookListsDeleteHasErrored,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      deleteBook: (bookId, bookListId) => dispatch(deleteBookFromBookList(bookId, bookListId)),
      postBookListName: (newListName, bookListId) => dispatch(editBookListName(newListName, bookListId)),

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
