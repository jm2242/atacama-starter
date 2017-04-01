import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import book_stock_small from '../images/book_stock_small.jpeg'

import { postBooktoBookList, addBookToBookListSaga } from '../actions/actionCreators'

// components
import AddToBookListPopover from './AddToBookListPopover'

// material ui
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

// styles
const styles = {
  card: {
    margin: 10
  },
  chip: {
    margin: 4,
  },
  actions: {
    margin: 10
  }
}


class BookCard extends Component {
  handleAddToBookList = (bookListId) => {
    const { book } = this.props
    console.log('in the handleAddToBookList hander' )
    console.log(bookListId)
    this.props.postBookSaga(book, bookListId)
  }

  render() {
    const { book } = this.props

    // old stuff that was needed before hack was fixed
    // let bookListId = undefined
    // if (this.props.bookLists && this.props.bookLists[0]) {
    //   bookListId = this.props.bookLists[0].id
    // }
    //const bookId = book.id
    return (
      <Card style={styles.card} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
        {/* <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          //avatar="images/jsa-128.jpg"
        /> */}
        <CardMedia
          // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={book_stock_small} alt="stock" />
        </CardMedia>
        <CardTitle
          title={book.title}
          subtitle={book.authors[0] && book.authors[0].name}
        />
        <CardText>
          A short description of the book. We can let this be shortened like...
        </CardText>
        <Divider />
        <CardText>
          <b>Genres</b>:
          {book.genres.map(
            (genre , i) => <Chip
              style={styles.chip}
              key={i}
              >
              <div style={{fontSize: 10}}>{genre} </div>
            </Chip>
          )}
        </CardText>
        <Divider />

        <CardActions>
          <RaisedButton style={styles.actions}
            containerElement={<Link to={`/reader/${book.id}`} />}
            label="Read Book" />

           <AddToBookListPopover
             handleAddToBookList={this.handleAddToBookList}
             bookListNames={this.props.bookListNames}
           />
        </CardActions>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        hasErrored: state.postBookHasErrored
    };
};


const mapDispatchToProps = (dispatch) => {
  return {
    postBook: (book, bookListId) => dispatch(postBooktoBookList(book, bookListId)),
    postBookSaga: (book, bookListId) => dispatch(addBookToBookListSaga(book, bookListId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
