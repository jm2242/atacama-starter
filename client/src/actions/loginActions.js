
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING'
const LOGIN_HAS_ERRORED = 'LOGIN_HAS_ERRORED'


// Action creators
export function loginHasErrored(bool) {
  return {
    type: LOGIN_HAS_ERRORED,
    hasErrored: bool
  }
}


export function loginIsLoading(bool) {
  return {
    type: LOGIN_IS_LOADING,
    isLoading: bool
  }
}

// eventually we'll get the user data
export function loginPostSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export function errorAfterFiveSeconds() {
  // we return a function instead of an action object
  return (dispatch) => {
    setTimeout( () => {
      // this function is able to dispatch other action creaters
      dispatch(loginHasErrored(true))
    }, 7000)
  }
}



export function loginPost(response) {
    return (dispatch) => {
        dispatch(loginIsLoading(true));
        console.log('logging response from google:');
        console.log(response);
        fetch('/auth/bearer', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + response.tokenObj.id_token
          },
          })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(loginIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((user) => dispatch(loginPostSuccess(user)))
            .catch(() => dispatch(loginHasErrored(true)));
    };
}
