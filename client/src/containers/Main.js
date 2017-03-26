//@flow
import React from 'react';
import { connect } from 'react-redux'
import * as BookListActionCreators from '../actions/bookListActions'
//import { Link } from 'react-router';

import Header from './Header'
import LeftNavBar from './LeftNavBar'
import Footer from './Footer'

// styles



const Main = React.createClass({
  componentDidMount() {
    let { dispatch } = this.props
    const url = '/api/book-lists'
    console.log("main has mounted")
    dispatch(BookListActionCreators.bookListsFetchData(url))
  },

  render() {
    // Then we go ahead and return some JSX
    return (
      <div>
        <Header {...this.props} />
        <div>
          {/* Do we need this?  */}
          {/* We use cloneElement here so we can auto pass down props */}
          { React.cloneElement(this.props.children, this.props) }
        </div>
        <LeftNavBar />
        <Footer />
      </div>
    );
  }

});

export default connect(
  state => ({ bookLists: state.bookLists })
)(Main)
