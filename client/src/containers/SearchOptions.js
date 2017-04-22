import React, { Component } from 'react';
import { connect } from 'react-redux'
import { booksFetchData } from '../actions/actionCreators'

// components
import SearchOption from '../components/SearchOption'


// material UI
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  applyFilters: {
    padding: 10
  }
}


class SearchOptions extends Component {

  render() {
    if (this.props.facets.length > 0) {
      return (

       <div>
         <RaisedButton label="Apply Filters" secondary={true} style={styles.applyFilters}/>
         {this.props.facets.map((facet) => <SearchOption key={facet.name} facet={facet} />)}
       </div>
      )
    } else {
      return <div></div>
    }
    // if (this.props.facets) {
    //   return (
    //     <div>
    //       {this.props.facets.map((facet) => <SearchOption key={facet.name} facet={facet} />)}
    //     </div>
    //   )
    // }
    // else {
    //   return <div />
    // }
  }
}

function mapStateToProps(state) {
  return {
    facets: state.facets,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);
