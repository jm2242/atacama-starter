import React from 'react';
import { Link } from 'react-router';
import BookGrid from './BookGrid'
import { connect } from 'react-redux'
import { booksFetchData } from '../actions/actionCreators'


const Home = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    const url = '/api/books/search?q=' + this.refs.queryText.value
    this.props.search(url);
    this.refs.bookSearch.reset();
  },

  render() {

    if (this.props.hasErrored) {
      return <p> Sorry! There was an error getting items </p>
    }

    if (this.props.isLoading) {
      return <p> Loading... </p>
    }

    return (
      <div>
        <h1 className="row center-xs">
          <Link to="/">Atacama</Link>
        </h1>

        <form onSubmit={this.handleSubmit} ref="bookSearch">
            <input type="text" ref="queryText" placeholder="Book List Name"/>
            <input type="submit" hidden/>
        </form>

        <BookGrid {... this.props} />
      </div>
    );
  }

});


const mapStateToProps = (state) => {
    return {
        books: state.books,
        bookLists: state.bookLists,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
