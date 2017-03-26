import React, {Component} from 'react';

// material UI
import Divider from 'material-ui/Divider';



const style = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: 0,
  padding: '1rem',
  textAlign: 'center',
  backgroundColor: 'rgb(105,105,105)'
}


class Footer extends Component {
  render() {
    return (
      <div className="center-xs" style={style}>
        Some Text
        <Divider />
        This is a Footer
      </div>
    )
  }
}


export default Footer
