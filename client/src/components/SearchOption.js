import React, { Component } from 'react';
import { connect } from 'react-redux'

// material-ui
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';


class SearchOption extends Component {
  render() {
    return (
      <div>
        <b>{this.props.facet.name} </b>
        {this.props.facet.values.map((value) => <Checkbox key={value.key} label={value.key + ` (` + value.count + `)` } /> )}
        <Divider />
      </div>
    )
  }
}

export default SearchOption
