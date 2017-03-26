import React, {Component} from 'react';
import { AutoComplete }   from 'material-ui';

// import material ui
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  button: {
    margin: 12,
  },
  progress: {
    marginTop: 10
  }
}

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.search = this.search.bind(this)
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }

  // call the onNewRequest function with a button click
  search() {
    const query = this.state.inputValue;
    this.props.onNewRequest(query, -1)
  }

  onUpdateInput(inputValue) {
    this.setState({
      inputValue: inputValue
    })
  }

  render() {
    return (
    <div>
      <AutoComplete
              hintText="Search For Books"
              dataSource={this.state.dataSource}
              onUpdateInput={this.onUpdateInput}
              onNewRequest={this.props.onNewRequest}
      />
      {/* If we're loading, show the progress circle, otherwise show the button  */}
     {this.props.loading ? (
       <CircularProgress size={40} style={style.progress} />
     ) : (
       <RaisedButton onClick={this.search} label="Search" secondary={true} style={style.button} />
     )}
    </div>
    )
  }
}

export default SearchBox;
