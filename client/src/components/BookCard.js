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
    padding: 0,
    margin: 10,
    lineHeight: 0
  },
  chip: {
    margin: 4,
  },
  actions: {
    margin: 10
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  titleStyle: {
    fontSize: '1.1rem'
  },
  chipText: {
    fontSize: '.6rem',
    textTransform: 'capitalize'
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
      <Card style={styles.card} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
        <CardTitle titleStyle={styles.titleStyle}
          title={book.title}
          subtitle={book.authors[0] && book.authors[0].name}
        />
        {/* <CardText>
          A short description of the book. We can let this be shortened like...
        </CardText> */}
        <Divider />
        <CardText>
          <div style={styles.wrapper}>
            {book.genres.map(
              (genre , i) => <Chip
                style={styles.chip}
                key={i}
                >
                <div style={styles.chipText}>{genre} </div>
              </Chip>
            )}
            </div>
        </CardText>
        <Divider />

        <CardActions>
          <div style={styles.wrapper}>
            <RaisedButton style={styles.actions}
              containerElement={<Link to={`/reader/${book.id}`} />}
              label="Read Book"
              disabled={!book.hasFullText}
            />

            <RaisedButton style={styles.actions}
              // containerElement={<Link to={`/reader/${book.id}`} />}
              href={`http://atacama411.web.engr.illinois.edu/viz.html?q=` + book.id}
              target="_blank"
              label="Visualize"
            />

             <AddToBookListPopover
               handleAddToBookList={this.handleAddToBookList}
               bookListNames={this.props.bookListNames}
             />
         </div>
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
