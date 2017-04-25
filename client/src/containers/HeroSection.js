import React, { Component } from 'react';


const styles = {
  title: {
    fontWeight: 300,
    fontSize: 56,
    //color: 'rgba(255, 255, 255, 0.870588)'
  },
  subTitle: {
    fontWeight: 300,
    fontSize: 24,
    paddingTop: 16,
    //color: 'rgba(255, 255, 255, 0.870588)'
  },
  background: {
    backgroundColor: 'rgb(238,238,238)',
  }
}

class HeroSection extends Component {
  render() {
    return (
      <div style={styles.background}>
        <div className="container">
          <h1 style={styles.title}>
            Welcome to Atacama Books!
          </h1>
          <p style={styles.subTitle}>
            Did you know that some prisons are built based on the number of third graders who lack literacy? We believe that promoting literacy is the most important thing one can do, our society depends on it.
          </p>
          <p style={styles.subTitle}>Check out some of our free, public domain books</p>
      </div>
    </div>
    )
  }
}

export default HeroSection
