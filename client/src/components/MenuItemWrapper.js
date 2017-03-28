import React, { Component } from 'react'

import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'
import FontIcon from 'material-ui/FontIcon';
import NoteAdd from 'material-ui/svg-icons/action/note-add';




class MenuItemWrapper extends Component {
  render() {
    const { bookListId } = this.props.bl
    return (
      <div>
        <MenuItem
          onClick={(event) => this.props.handleAddToBookList(event, bookListId)}
          primaryText={this.props.primaryText}
          rightIcon={this.props.loading ? (
            <CircularProgress size={30}/> ) : (
            <NoteAdd />
            )}
        />
      </div>
    )
  }
}

export default MenuItemWrapper
