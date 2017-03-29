import React, { Component } from 'react';
import { ReactReader } from 'react-reader'
import 'babel-polyfill'

class Reader extends Component {
  render() {
    return (
      <div style={{position: 'relative', height: '100%'}}>
        <ReactReader
          url={'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'}
          title={'Alice in wonderland'}
          location={'epubcfi(/6/2[cover]!/6)'}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      </div>
    )
  }
}


export default Reader
