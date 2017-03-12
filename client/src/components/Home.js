import React from 'react';
import { Link } from 'react-router';
import BookGrid from './BookGrid'

const Home = React.createClass({

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <h1 className="row center-xs">
          <Link to="/">Atacama</Link>
        </h1>
        <BookGrid {... this.props} />
      </div>
    );
  }

});

export default Home;