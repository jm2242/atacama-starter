import React from 'react';


import BookListNameForm from './BookListNameForm'

// Material UI imports
//import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MobileTearSheet from './MobileTearSheet'

//import Divider from 'material-ui/Divider';
//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


class BookList extends React.Component {

  render() {

    const bookList = this.props.bookLists[0]


    if (bookList) {
      return (
          <div>
            <MobileTearSheet>
              <List>
                <Subheader>{bookList.name}</Subheader>

                {/* List out the books in the book list  */}
                {bookList.books.map((book,i) => <ListItem
                    key={i}
                    primaryText={book.title}
                  />
                )}
              </List>
            </MobileTearSheet>
            {/* <span>
              <TextField hintText="Change Book List Name" />
            </span>
            <span>
              <RaisedButton label="save" primary={true}/>
            </span> */}
            <BookListNameForm bookListId={bookList.id} />

        </div>
      )
    }
    return <div></div>



  }


}

export default BookList
