import React from 'react';
import { connect } from 'react-redux'
import { bookListsFetchData } from '../actions/bookListActions'
import BookList from '../components/BookList'


const BookLists = React.createClass({

  componentDidMount() {
    if (this.props.bookLists.length > 0) {
      console.log('we already have a book list')
    } else {
      console.log('making an api call to get book lists')
      this.props.fetchData('/api/book-lists')
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
        <h1 className="row center-xs">
          My Book Lists
        </h1>
        <div className="row center-xs">
          {/* For some reason we need the ...this.props to get book list  */}
          {this.props.bookLists.map((bookList, i) => <BookList key={i} {...this.props} /> )}
        </div>
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
