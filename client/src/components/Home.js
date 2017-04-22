import React, { Component } from 'react';
import { connect } from 'react-redux'
import { booksFetchData, facetsFetchData } from '../actions/actionCreators'
import { getBookListNames } from '../selectors/index'

// components
import BookGrid from './BookGrid'
import SearchBox from './SearchBox'
import SearchOptions from '../containers/SearchOptions'

// material UI
import Divider from 'material-ui/Divider';



const styles = {
  divider: {
    marginTop: '30px',
  },
};


class Home extends Component {
  constructor(props) {
    super(props)
    this.onNewRequest = this.onNewRequest.bind(this)
    this.state = {
      queryText: ''
    }
  }

  // signature based on callback function documentation in material-ui
  onNewRequest(chosenRequest, index) {

    // get the books for the book grid
    const query = '/api/books/search?q=' + chosenRequest
    this.props.search(query);

    // get the facet options for the facet nav section
    const facet = '/api/books/facet?q=' + chosenRequest
    this.props.getFacets(facet)
  }

  render() {

    return (
      <div className="center-xs">
         {/* <TextField hintText="Search For Books" /> */}
       <SearchBox loading={this.props.isLoading} onNewRequest={this.onNewRequest} />

       <Divider style={styles.divider} />
       <div className="container">
         <div className="row">

           <div className="col-xs-2">
             <SearchOptions />
           </div>

           <div className="col-xs-10">
             <BookGrid {...this.props} />
           </div>

         </div>
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
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url)),
      getFacets: (url) => dispatch(facetsFetchData(url))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
