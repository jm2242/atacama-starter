import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import MobileTearSheet from './MobileTearSheet'

const BookList = React.createClass({


  render() {
    const { name } =  this.props.bookList
    const { books } = this.props.bookList
    return (
        <MobileTearSheet>
          <List>
            <Subheader>{name}</Subheader>

            {/* List out the books in the book list  */}
            {books.map((book,i) => <ListItem
                key={i}
                primaryText={book.title}
              />
            )}
          </List>
        </MobileTearSheet>
    )
  }


})

export default BookList
