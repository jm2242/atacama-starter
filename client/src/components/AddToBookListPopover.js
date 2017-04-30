import React, { Component } from 'react'


// components
import MenuItemWrapper from './MenuItemWrapper'

// material-ui
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'



class AddToBookListPopover extends Component {
  constructor(props) {
    super(props)

    // initial state
    this.state = {
      open: false,
    }
  }

  // handle the button click
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  // close the popover
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  // handle the add to book list
  handleAddToBookList = (event, bookListId) => {
    event.preventDefault()
    this.props.handleAddToBookList(bookListId)

    // close the popover
    this.handleRequestClose()
  }


  render() {
    return (
      <div>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Save to Booklist"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {this.props.bookListNames.map(
              (bl) => <MenuItemWrapper
                handleAddToBookList={this.handleAddToBookList}
                key={bl.bookListId}
                primaryText={bl.bookListName}
                bl={bl}
                loading={false}
                />
            )}
          </Menu>
        </Popover>
      </div>
    );
  }

}





export default AddToBookListPopover
