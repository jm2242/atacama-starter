import React from 'react';
import { Link } from 'react-router';


const BookList = React.createClass({

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <h1 className="row center-xs">
          <Link to="/">Book List</Link>
        </h1>
      </div>
    );
  }

});

export default BookList;
