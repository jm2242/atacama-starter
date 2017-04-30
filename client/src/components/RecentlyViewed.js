import React, {Component} from 'react';
import { connect } from 'react-redux'

import { getRecentBooks } from '../actions/actionCreators'

import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';


const styles = {
  chip: {
    margin: 4,
  },
  chipText: {
    fontSize: '.6rem',
    textTransform: 'capitalize'
  },
  text: {
    color: 'rgb(153,153,153)'
  }
}

class RecentlyViewed extends Component {

  // get recently viewed books
  componentDidMount() {
    this.props.fetchRecentBooks()
  }

  render() {
    if (this.props.recentBooks) {
      return (

        <div className="container">
          <Divider />
          <div className="row center-xs">
            <h1 className="title">Recently Viewed books </h1>
          </div>
          <div className="row center-xs">

            {this.props.recentBooks.map(
              (book,i) => <Chip
                style={styles.chip}
                key={i}
                className="col-xs-4"
                >
                <div style={styles.chipText}>{book.title}</div>
              </Chip>)}
          </div>
      </div>

      )
    } else {
      return <div></div>
    }
  }
}


const mapStateToProps = (state) => {
    return {
      recentBooks: state.recentBooks
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchRecentBooks: () => dispatch(getRecentBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyViewed);
