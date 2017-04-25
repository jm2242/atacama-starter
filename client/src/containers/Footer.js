import React, {Component} from 'react';

// material UI
//import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


const styles = {
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: 'rgb(33,33,33)'
  },
  text: {
    color: 'rgb(153,153,153)'
  }
}


class Footer extends Component {
  render() {
    return (
      <div>

        <div className="center-xs" style={styles.footer}>
          <p style={styles.text}>Atacama Books </p>
        </div>

      </div>
    )
  }
}


export default Footer
