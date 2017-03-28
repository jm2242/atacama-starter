import React, { Component } from 'react';
import {
  EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
  EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
  ReactReader, // A simple epub-reader with left/right button and chapter navigation
  ReactReaderStyle // Styles for the epub-reader it you need to customize it
} from 'react-reader'


class Reader extends Component {
  render() {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <ReactReader
          url={'http://www.gutenberg.org/ebooks/28885.epub.noimages?session_id=b98a21d21d85c830500784758b51d7b29e49bd7d'}
          title={'Alice in wonderland'}
          location={'epubcfi(/6/2[cover]!/6)'}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    )
  }
}


export default Reader
