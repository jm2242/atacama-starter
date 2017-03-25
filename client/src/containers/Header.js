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

  // route to home when clicking on the logo 
  handleRouteToHome=() => {
    this.props.router.push('/')
  }

  render() {
    return (
      <NavBar onTitleTouchTap={this.handleRouteToHome} onLeftIconButtonTouchTap={this.handleToggle} />
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
