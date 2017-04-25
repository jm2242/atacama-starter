import React from 'react'
//import { connect } from 'react-redux'
import BookCard from './BookCard'
import Paginate from './Paginate'
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
      if (this.props.books && this.props.books.results) {

        return (
          <div>
            {this.props.books.results.length > 0 &&
              <h2 className="title">Search Results</h2>
            }
            <div className="row center-xs">
              {this.props.books.results.map((book,i) => <BookCard key={i} book={book} {...this.props} addBookToBookList={this.props.addBookToBookList} />)}
            </div>

            {/* Pagination  */}
            <div className="row center-xs">
              <Paginate
                pages={this.props.books.pages}
                currentPage={this.props.currentPage}
                nextPage={this.props.nextPage}
                prevPage={this.props.prevPage}
              />
            </div>

            { this.props.hasErrored &&
              <div>
                <p> Our sincerest apologies. Something Has gone terribly wrong fetching
                your books. </p>
              </div>
            }
          </div>
        )
      } else {
        return <div></div>
      }
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
