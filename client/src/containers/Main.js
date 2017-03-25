//@flow
import React from 'react';
//import { Link } from 'react-router';

import Header from './Header'
import LeftNavBar from './LeftNavBar'
const Main = React.createClass({

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <Header />
        <div>
          {/* Do we need this?  */}
          {/* We use cloneElement here so we can auto pass down props */}
          { React.cloneElement(this.props.children, this.props) }
        </div>
        <LeftNavBar />

      </div>
    );
  }

});

export default Main;
