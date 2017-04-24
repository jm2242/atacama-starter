import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ReactReader } from 'react-reader'
import 'babel-polyfill'


// Styles
import styles from '../styles/reader.css'


const storage = global.localStorage || null

class Reader extends Component {
  constructor (props) {
   super(props)
   this.state = {
     fullscreen: false,
     bookName:  'Book Title',
     location: (storage && storage.getItem('epub-location')) ? storage.getItem('epub-location') : 0

   }
 }
 componentDidMount() {
   this.getBookName()
 }

 getBookName() {
   try {

     const bookName = this.props.books.find((book) => book.id === parseInt(this.props.params.bookId,10)).title
     console.log(bookName)
     this.setState({
       bookName
     })
   }
   catch (e) {
     console.log(e)
   }
 }

 onLocationChanged = (loc) => {
    storage && storage.setItem('epub-location', loc)
  }

  render() {
    const bookId = this.props.params.bookId
    const url = 'https://s3.amazonaws.com/atacama-books/' + bookId + '.epub'
    const {fullscreen, location} = this.state
    return (
      <div className="container">
        <div className="readerHolder">
          <ReactReader
            // url={'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'}
            url={url}
            title={this.state.bookName}
            location={location}
            locationChanged={this.onLocationChanged}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.results
    };
};

const mapDispatchToProps = (state) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(Reader);
