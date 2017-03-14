import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { bookListsFetchData } from '../actions/bookListActions'
import BookList from '../components/BookList'


const BookLists = React.createClass({

  componentDidMount() {
    this.props.fetchData('/api/book-lists')
  },
  render() {
    const firstBookList = this.props.bookLists[0]


    if (this.props.hasErrored) {
      return <p> Sorry! There was an error getting items </p>
    }

    if (this.props.isLoading) {
      return <p> Loading... </p>
    }

    return (
      <div>
        <h1 className="row center-xs">
          Book Lists
        </h1>
        {/* For some reason we need the ...this.props to get book list  */}
        {/* <BookList {...this.props} bookList={firstBookList} /> */}
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
      fetchData: (url) => dispatch(bookListsFetchData(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookLists);
