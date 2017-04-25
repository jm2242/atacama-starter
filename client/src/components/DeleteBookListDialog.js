import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DeleteBookListDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = () => {
    this.setState({open: false});

    // fire off edit request
    this.props.deleteBookList(this.props.bookList.id)

  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ];
    const { bookList } = this.props
    return (
      <div>
        <FlatButton label="Delete" onTouchTap={this.handleOpen} />
        <Dialog
          title={`Delete Booklist ${ bookList.name} `}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Your're about to delete this book list. Are you sure
        </Dialog>
      </div>
    );
  }
}
