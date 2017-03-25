import React from 'react'
//import { connect } from 'react-redux'
import BookCard from './BookCard'
//import { booksFetchData } from '../actions/actionCreators'
const BookGrid = React.createClass({

  // componentDidMount() {
  //
  //   if (this.props.books.length > 0) {
  //     console.log('we already have books')
  //   } else {
  //     console.log('making an api call to get books')
  //     this.props.fetchData('/api/books')
  //   }
  // },


  render() {

      // if (this.props.hasErrored) {
      //   return <p> Sorry! There was an error getting items </p>
      // }
      //
      // if (this.props.isLoading) {
      //   return <p> Loading... </p>
      // }

      return (
        <div>
          {this.props.books.length > 0 &&
            <h2>Search Results</h2>
          }
          <div className="row">
            {this.props.books.map((book,i) => <BookCard key={i} book={book} {...this.props} addBookToBookList={this.props.addBookToBookList} />)}
          </div>
      </div>
    );
  }
});

// const mapStateToProps = (state) => {
//     return {
//         books: state.books,
//         bookLists: state.bookLists,
//         hasErrored: state.booksHasErrored,
//         isLoading: state.booksIsLoading
//     };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//       fetchData: (url) => dispatch(booksFetchData(url))
//   };
// };
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(BookGrid);

export default BookGrid
