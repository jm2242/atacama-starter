import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer,
         AppBar,
         Divider }            from 'material-ui';

/* component styles */
// import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators   from '../actions/ui-actions';

class LeftNavBar extends Component {
  constructor(props) {
    super(props);
  }

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
          <AppBar title="" />
          <Divider />
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
