import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFacet, removeFacet } from '../actions/actionCreators'

// material-ui
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';


class SearchOption extends Component {

  checkboxChecked = (isInputChecked, facetValue) => {
    // if we're checking a checkbox, then we need to add a facet
    if (isInputChecked) {
      this.props.addFacet_local(this.props.facetName, facetValue)
    } else {
      this.props.removeFacet_local(this.props.facetName, facetValue)
    }

  }

  render() {
    return (
      <div>
        <b>{this.props.facet.name} </b>
        {this.props.facet.values.map((value) =>
          <Checkbox
            key={value.key}
            onCheck={(event, isInputChecked) => this.checkboxChecked(isInputChecked, value.key)}
            label={value.key + ` (` + value.count + `)` }
          />
        )}
        <Divider />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
      removeFacet_local: (facetName, facetValue) => dispatch(removeFacet(facetName, facetValue)),
      addFacet_local: (facetName, facetValue) => dispatch(addFacet(facetName, facetValue))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchOption);
