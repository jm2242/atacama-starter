import { connect } from 'react-redux'
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { loginPost } from '../actions/loginActions'


const failureGoogle = (response) => {
  console.log(response);
}


class Login extends Component {

  // responseGoogle(response) {
  //   console.log(response)
  //   this.props.authenticateLogin(response)
  // }

  render() {
    return (
      <GoogleLogin
        clientId="103157729265-1jg5dl3i55urmdjskuiul00stqttc9a2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.props.authenticateLogin}
        onFailure={failureGoogle}
      />
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.loginHasErrored,
        isLoading: state.loginIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      authenticateLogin: (response) => dispatch(loginPost(response))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Login);
