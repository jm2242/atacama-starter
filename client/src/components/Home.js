import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <h1 className="row center-xs">
          <Link to="/">Atacama</Link>
        </h1>
      </div>
    );
  }

});

export default Home;
