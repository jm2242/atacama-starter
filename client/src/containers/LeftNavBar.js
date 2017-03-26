import React, { Component }   from 'react';
import { Link } from 'react-router'

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer,
         AppBar,
         Divider }            from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';



/* component styles */
// import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators   from '../actions/ui-actions';

class LeftNavBar extends Component {

  static contextTypes = {
    router : React.PropTypes.object.isRequired
  }

  closeNav=() => {
    this.props.actions.ui.closeNav();
  }

  render() {

    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.ui.leftNavOpen}
          onRequestChange={this.closeNav}>
          <AppBar title="Atacama" iconElementLeft={<IconButton onClick={this.closeNav}><NavigationClose /></IconButton>} />
          <Divider />
          <MenuItem onClick={this.closeNav}
            primaryText="Home"
            containerElement={<Link to="/" />}
          />
          <MenuItem onClick={this.closeNav}
            primaryText="My Book Lists"
            containerElement={<Link to="/booklist" />}
          />
        </Drawer>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ui   : state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui   : bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavBar);
