import React, { Component } from 'react'
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import * as uiActionCreators from '../actions/ui-actions'


// Components
import NavBar from '../components/NavBar'


class Header extends Component {

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  render() {
    return (
      <NavBar onLeftIconButtonTouchTap={this.handleToggle} />
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
