import React from 'react';
import { connect } from 'react-redux'
import book_stock_small from '../images/book_stock_small.jpeg'

import { postBooktoBookList } from '../actions/actionCreators'

// material ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';

// styles
const styles = {
  card: {
    margin: 10
  },
  chip: {
    margin: 4,
  }
}



const BookCard = React.createClass({


  render() {
    const { book } = this.props
    let bookListId = undefined
    if (this.props.bookLists && this.props.bookLists[0]) {
      bookListId = this.props.bookLists[0].id
      console.log(bookListId)
    }
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
        <CardTitle title={book.title} subtitle={book.authors[0].name} />
        <CardText>
          A short description of the book. We can let this be shortened like...
        </CardText>
        <Divider />
        <CardText>
          <b>Genres</b>:
          <Chip
            style={styles.chip}
            >
            Fiction
          </Chip>
        </CardText>
        <Divider />

        <CardActions>
          <FlatButton
            onClick={this.props.postBook.bind(null, book, bookListId)}
            label="Save to booklist"
            primary={true}
           />
        </CardActions>
      </Card>
    )
  }
})

const mapStateToProps = (state) => {
    return {
        hasErrored: state.postBookHasErrored,
    };
};


const mapDispatchToProps = (dispatch) => {
  return {
    postBook: (book, bookListId) => dispatch(postBooktoBookList(book, bookListId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
