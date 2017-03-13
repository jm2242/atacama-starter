import React from 'react'
import { connect } from 'react-redux'
import BookCard from './BookCard'
import { booksFetchData } from '../actions/actionCreators'
const BookGrid = React.createClass({

  componentDidMount() {
    this.props.fetchData('/api/books')
  },


  render() {

      if (this.props.hasErrored) {
        return <p> Sorry! There was an error getting items </p>
      }

      if (this.props.isLoading) {
        return <p> Loading... </p>
      }
      return (
      <div className="row">
        {this.props.books.map((book,i) => <BookCard key={i} i={i} book={book} />)}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
    return {
        books: state.books,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(booksFetchData(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookGrid);
