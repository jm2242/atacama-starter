import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addFacet, removeFacet } from '../actions/actionCreators'

// material-ui
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

const styles = {
  facetTitle: {
    textTransform: 'capitalize',
    display: 'inline-block'
  },
  toggle: {
    display: 'inline-block'
  }
}

class SearchOption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAllResults: false
    }
  }
  checkboxChecked = (isInputChecked, facetValue) => {
    // if we're checking a checkbox, then we need to add a facet
    if (isInputChecked) {
      this.props.addFacet_local(this.props.facetName, facetValue)
    } else {
      this.props.removeFacet_local(this.props.facetName, facetValue)
    }

  }

  toggleShowResults = () => {
    if (this.state.showAllResults) {
      this.setState({showAllResults: false})
    } else {
      this.setState({showAllResults: true})
    }
  }


  render() {
    const allValues = this.props.facet.values
    let values = allValues

    // show only 5 results if show all isn't toggled
    if (allValues.length > 5 && ! this.state.showAllResults) {
      values = allValues.slice(0,5)
    } else {
      values = allValues
    }
    return (
      <div>
        <span><b style={styles.facetTitle}>{this.props.facet.name} </b></span>

        {allValues.length > 5 &&
          <span>
          <Toggle
            label="Show all"
            style={styles.toggle}
            onToggle={this.toggleShowResults}
          />
          </span>
        }
        {values.map((value) =>
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
