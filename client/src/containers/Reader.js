import React, { Component } from 'react';
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
     location: (storage && storage.getItem('epub-location')) ? storage.getItem('epub-location') : 0
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
            title={'Book Title'}
            location={location}
            locationChanged={this.onLocationChanged}
          />
        </div>
      </div>
    )
  }
}


export default Reader
