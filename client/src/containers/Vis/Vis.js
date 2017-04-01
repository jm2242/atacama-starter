import React, { Component } from 'react';
import * as d3 from "d3"

class Vis extends Component {

    createMarkup() {
      return {__html: 'First &middot; Second'};
    }

    render() {
      return (
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      )
    }
}







export default Vis
