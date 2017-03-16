import React, { Component } from 'react'
//import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { postBookListName } from '../actions/actionCreators'


// Material UI
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const BookListNameForm = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    this.props.postData(this.refs.listName.value, this.props.bookListId);
    this.refs.nameForm.reset();
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} ref="nameForm">
          <input type="text" ref="listName" placeholder="Book List Name"/>
          <input type="submit" hidden/>
      </form>
    )
  }
})


const mapStateToProps = (state) => {
    return {
        hasErrored: state.bookListsChangeHasErrored,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      postData: (listName, bookListId) => dispatch(postBookListName(listName, bookListId))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(BookListNameForm);
