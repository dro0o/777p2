import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signup':
      return { errorMessage: '', token: action.payload }
    default:
      return state
  }
}

// Syntax is: arrow func returns function, specify both on top line
const signup = dispatch => async ({ email, password }) => {
  // make api request to sign up with email and password
  try {
    // if we sign up, modify our state and say that we are authed
    const response = await trackerApi.post('/signup', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signup', payload: response.data.token })

    // navigate to main flow
    navigate('TrackList')
  } catch (err) {
    // if sign up fails, reflect an error message
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with signup'
    })
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
  { token: null, errorMessage: '' }
)
