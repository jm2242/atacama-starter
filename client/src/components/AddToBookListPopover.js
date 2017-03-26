import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'




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
  handleAddtoBookList = (event, bookListId) => {
    event.preventDefault()
    this.props.handleAddToBookList(bookListId)
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
              (bl) => <MenuItem
                onClick={(event) => this.handleAddtoBookList(event, bl.bookListId)}
                key={bl.bookListId}
                primaryText={bl.bookListName} /> )
            }
          </Menu>
        </Popover>
      </div>
    );
  }

}





export default AddToBookListPopover
