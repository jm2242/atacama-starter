import React from 'react';
import BookCard from './BookCard';

const BookGrid = React.createClass({

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.addItem(this.refs.item.value);
  // },

  render() {
    return (
      <div className="row">
        {this.props.books.map((book,i) => <BookCard key={i} i={i} book={book} />)}
      </div>
    );
  }
});

export default BookGrid;
