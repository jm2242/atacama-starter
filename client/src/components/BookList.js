import React from 'react';
//import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//import Divider from 'material-ui/Divider';
//import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import MobileTearSheet from './MobileTearSheet'

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
            <span>
              <TextField hintText="Change Book List Name" />
            </span>
            <span>
              <RaisedButton label="save" primary={true}/>
            </span>

        </div>
      )
    }
    return <div></div>



  }


}

export default BookList
