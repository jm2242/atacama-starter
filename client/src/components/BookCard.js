import React from 'react';
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import book_stock_small from '../images/book_stock_small.jpeg'

import { postBooktoBookList } from '../actions/actionCreators'


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
      <Card className="col-xs-2">
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          //avatar="images/jsa-128.jpg"
        />
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={book_stock_small} alt="stock" />
        </CardMedia>
        <CardTitle title={book.title} subtitle={book.authors[0].name} />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton onClick={this.props.postBook.bind(null, book, bookListId)} label="Save to booklist" />
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
