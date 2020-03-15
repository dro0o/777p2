import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const signup = dispatch => {
  return async ({ email, password }) => {
    // make api request to sign up with email and password
    try {
      const response = await trackerApi.post('/signup', { email, password })
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data)
    }
    // if we sign up, modify our state and say that we are authed
    // if sign up fails, reflect an error message
  }
}

const signin = dispatch => {
  return ({ email, password }) => {
    // try to sign in
    // handle success by updating state
    // handle failure by showing error message
  }
}

const signout = dispatch => {
  return () => {
    // sign out somehow
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { isSignedIn: false }
)
