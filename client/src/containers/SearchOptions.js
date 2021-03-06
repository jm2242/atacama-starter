import React, { Component } from 'react';
import { connect } from 'react-redux'
import { booksFetchData, facetsFetchData, storeFullQuery } from '../actions/actionCreators'
import { constructFacetUrl } from '../selectors/index'

// components
import SearchOption from '../components/SearchOption'


// material UI
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  applyFilters: {
    marginTop: 10,
    marginBottom: 10
  }
}


class SearchOptions extends Component {

  applyFilters = () => {

    const { facetUrl } = this.props
    const { query } = this.props
    //const { fullQuery } = this.props
    const searchUrl = `/api/books/search?q=${query}${facetUrl}`
    const fullFacetUrl = `/api/books/facet?q=${query}${facetUrl}`

    // make new requests
    this.props.search(searchUrl);
    this.props.getFacets(fullFacetUrl);

    // store full query for pagination
    this.props.storeFullQuery(searchUrl)


  }

  render() {
    if (this.props.facets.length > 0) {
      return (

       <div>
         <RaisedButton
           onTouchTap={this.applyFilters}
           label="Apply Filters"
           secondary={true}
           style={styles.applyFilters}
         />
         {this.props.facets.map((facet) => <SearchOption key={facet.name} facetName={facet.name} facet={facet} />)}
       </div>
      )
    } else {
      return <div></div>
    }
  }
}

function mapStateToProps(state) {
  return {
    query: state.storeQuery,
    fullQuery: state.storeFullQuery,
    facets: state.facets,
    facetUrl: constructFacetUrl(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url)),
      getFacets: (url) => dispatch(facetsFetchData(url)),
      storeFullQuery: (query) => dispatch(storeFullQuery(query)),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);
