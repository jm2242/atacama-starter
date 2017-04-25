import React from 'react';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class EditBookListNameDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      inputValue : ''
    };
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleEdit = () => {
    this.setState({open: false});

    // fire off edit request
    this.props.postBookListName(this.state.inputValue, this.props.bookList.id)

  };

  handleClose = () => {
    this.setState({open: false});
  };


  onUpdateInput = (event, inputValue) => {
    console.log('change')
    this.setState({
      inputValue
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleEdit}
      />,
    ];
    const { bookList } = this.props
    return (
      <div>
        <FlatButton label="Edit" onTouchTap={this.handleOpen} />

        <Dialog
          title={`Edit Booklist ${ bookList.name} `}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Change the name of your booklist:

          <TextField
            hintText="  Edit Booklist name"
            onChange={this.onUpdateInput}
           />

        </Dialog>
      </div>
    );
  }
}
