import React from 'react';
import { connect } from 'react-redux'
import { fetchBookLists } from '../actions/bookListActions'
import { createBookList } from '../actions/actionCreators'
import BookList from '../components/BookList'

import RaisedButton from 'material-ui/RaisedButton'

const BookLists = React.createClass({

  componentDidMount() {
    if (this.props.bookLists.length > 0) {
      console.log('we already have a book list')
    } else {
      console.log('making an api call to get book lists')
      this.props.fetchBookLists()
    }
  },
  render() {

    if (this.props.hasErrored) {
      return <p> Sorry! There was an error getting items </p>
    }

    if (this.props.isLoading) {
      return <p> Loading... </p>
    }

    return (
      <div className="container">
        <div className="row center-xs">
          <h1 className="title">
            My Book Lists
          </h1>
        </div>

        <div style={{marginBottom: 20}} className="row center-xs">
           <RaisedButton
             label="New Book List"
             secondary={true}
             onTouchTap={this.props.newBookList}
           />
       </div>

        <div className="row center-xs">
          {this.props.bookLists.map((bookList, i) => <BookList key={i} bookList={bookList} /> )}
        </div>
        { this.props.bookLists.length === 0 &&
          <div>
            <p>Create a book list to save your favorite books!</p>
          </div>
        }
      </div>
    );
  }

});


const mapStateToProps = (state) => {
    return {
        bookLists: state.bookLists,
        hasErrored: state.bookListsHasErrored,
        isLoading: state.bookListsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchBookLists: () => dispatch(fetchBookLists()),
      newBookList: () => dispatch(createBookList())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookLists);
