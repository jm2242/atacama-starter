import React from 'react';
//import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
//import Divider from 'material-ui/Divider';
//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import MobileTearSheet from './MobileTearSheet'

class BookList extends React.Component {

  render() {

    const bookList = this.props.bookLists[0]


    if (bookList) {
      return (
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
      )
    }
    return <div></div>



  }


}

export default BookList
