import React, { Component } from 'react';
import { connect } from 'react-redux'

import { booksFetchData, incrementCurrentPage } from '../actions/actionCreators'


// import material ui
import IconButton from 'material-ui/IconButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import CircularProgress from 'material-ui/CircularProgress';


const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  }
}

class Paginate extends Component {

  nextPage = () => {
    const newUrl = `${this.props.fullQuery}&page=${parseInt(this.props.currentPage, 10)+1}`
    this.props.handleIncrementPage(1)
    this.props.search(newUrl)
  }

  prevPage = () => {
    const newUrl = `${this.props.fullQuery}&page=${parseInt(this.props.currentPage, 10)-1}`
    this.props.handleIncrementPage(-1)
    this.props.search(newUrl)
  }
  render() {
    if (this.props.isLoading) {
      return <CircularProgress size={50} />
    } else {
      return (
        <div>
          <IconButton
            tooltip="Previous"
            touch={true}
            tooltipPosition="top-center"
            disabled={this.props.currentPage <= 0}
            onTouchTap={this.prevPage}
            iconStyle={styles.largeIcon}
            style={styles.large}>
            <ChevronLeft />
          </IconButton>
          <IconButton
            tooltip="Next"
            touch={true}
            disabled={parseInt(this.props.currentPage, 10) >= this.props.pages - 1}
            onTouchTap={this.nextPage}
            tooltipPosition="top-center"
            iconStyle={styles.largeIcon}
            style={styles.large}>
            <ChevronRight />
          </IconButton>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
        fullQuery: state.storeFullQuery,
        hasErrored: state.booksHasErrored,
        isLoading: state.booksIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      search: (url) => dispatch(booksFetchData(url)),
      handleIncrementPage: (amount) => dispatch(incrementCurrentPage(amount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginate);
