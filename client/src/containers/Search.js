import React from 'react';
import { connect } from 'react-redux'

// curently not using this

const Search = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.refs.queryText.value);
    this.refs.nameForm.reset();
  },

  render() {
    return(
      <form onSubmit={this.handleSubmit} ref="nameForm">
          <input type="text" ref="listName" placeholder="Book List Name"/>
          <input type="submit" hidden/>
      </form>

    )
  }

})


const mapStateToProps = (state) => {
    return {
        hasErrored: state.searchHasErrored,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      search: (queryText) => dispatch(postBookListName(queryText))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Search);
