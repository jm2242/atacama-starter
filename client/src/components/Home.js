import React, { Component } from 'react';
import { connect } from 'react-redux'
import { booksFetchData, facetsFetchData, storeQuery, storeFullQuery } from '../actions/actionCreators'
import { getBookListNames } from '../selectors/index'

// components
import BookGrid from './BookGrid'
import SearchBox from './SearchBox'
import SearchOptions from '../containers/SearchOptions'
import HeroSection from '../containers/HeroSection'
import RecentlyViewed from './RecentlyViewed'

// material UI
import Divider from 'material-ui/Divider';



const styles = {
  divider: {
    marginTop: '30px',
  }
}


class Home extends Component {
  constructor(props) {
    super(props)
    this.onNewRequest = this.onNewRequest.bind(this)
    this.state = {
      queryText: '',
      currentPage: 0
    }
  }

  // signature based on callback function documentation in material-ui
  onNewRequest(chosenRequest, index) {

    // get the books for the book grid
    const query = '/api/books/search?q=' + chosenRequest
    this.props.search(query);

    this.props.storeQuery(chosenRequest);

    // store the full query so we can use page offsets
    this.props.storeFullQuery(query)

    // get the facet options for the facet nav section
    const facet = '/api/books/facet?q=' + chosenRequest
    this.props.getFacets(facet)
  }


  render() {

    return (
      <div className="center-xs">

       <SearchBox loading={this.props.isLoading} onNewRequest={this.onNewRequest} />
       <Divider style={styles.divider} />
       <div className="container">
         <div className="row center-xs">

           <div className="col-xs-2">
             <SearchOptions />
           </div>

           <div className="col-xs-10 cols-xs-offset-2">
             <BookGrid
               {...this.props}
               currentPage={this.state.currentPage}
               nextPage={this.nextPage}
               prevPage={this.prevPage}
              />
           </div>

         </div>

       </div>

       { this.props.books.length === 0 &&
        <HeroSection />
       }
       <div className="center-xs">
         <RecentlyViewed />
       </div>

      </div>

    )
  }

}


const mapStateToProps = (state) => {
    return {
        books: state.books,
        bookLists: state.bookLists,
        bookListNames: getBookListNames(state),
        currentPage: state.currentPage,
        fullQuery: state.storeFullQuery,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      storeQuery: (query) => dispatch(storeQuery(query)),
      storeFullQuery: (fullQuery) => dispatch(storeFullQuery(fullQuery)),
      search: (url) => dispatch(booksFetchData(url)),
      getFacets: (url) => dispatch(facetsFetchData(url))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
