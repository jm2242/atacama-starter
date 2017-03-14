import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const Login = React.createClass({


  render() {
    return (
      <GoogleLogin
        clientId="103157729265-1jg5dl3i55urmdjskuiul00stqttc9a2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    )
  }
})

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.loginHasErrored,
        isLoading: state.loginIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: (url) => dispatch(booksFetchData(url))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Login);
