import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { booksFetchData } from '../actions/actionCreators'

// components
import BookGrid from './BookGrid'
import SearchBox from './SearchBox'

// material UI
import Divider from 'material-ui/Divider';



const styles = {
  divider: {
    marginTop: '30px',
  },
};


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.onNewRequest = this.onNewRequest.bind(this)
    this.state = {
      queryText: ''
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const url = '/api/books/search?q=' + this.refs.queryText.value
  //   this.props.search(url);
  //   this.refs.bookSearch.reset();
  // }
  //
  // handleChange(event) {
  //   this.setState({
  //     queryText: event.target.value
  //   })
  // }

  // signature based on callback function documentation in material-ui
  onNewRequest(chosenRequest, index) {
    const url = '/api/books/search?q=' + chosenRequest
    this.props.search(url);
  }

  render() {

    if (this.props.hasErrored) {
      return <p> Sorry! There was an error getting items </p>
    }

    // if (this.props.isLoading) {
    //   return <p> Loading... </p>
    // }

    // return (
    //   <div>
    //     <h1 className="row center-xs">
    //       <Link to="/">Atacama</Link>
    //     </h1>
    //
    //     <form onSubmit={this.handleSubmit} ref="bookSearch">
    //         {/* <input type="text" ref="queryText" placeholder="Search For Books"/> */}
    //         <TextField ref="queryText" hintText="Search For Books" />
    //         <input type="submit" hidden/>
    //     </form>
    //
    //     <BookGrid {... this.props} />
    //   </div>
    // );
    return (
      <div className="center-xs">
         {/* <TextField hintText="Search For Books" /> */}
       <SearchBox loading={this.props.isLoading} onNewRequest={this.onNewRequest} />
       <Divider style={styles.divider} />
       <div className="container">
         <BookGrid {...this.props} />
       </div>
      </div>

    )
  }

}


const mapStateToProps = (state) => {
    return {
        books: state.books,
        bookLists: state.bookLists,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
