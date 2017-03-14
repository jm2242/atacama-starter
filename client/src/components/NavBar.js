import React, {Component} from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';



class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} href="/auth/google" label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Book List"
      containerElement={<Link to="/booklist">Book List</Link>} />
    {/* <MenuItem primaryText="Help" /> */}
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);



/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */


const NavBar = () => (
  <AppBar
    title={<Link to="/">Atacama</Link>}
    iconElementRight={<Logged />}
  />
);

export default NavBar;
