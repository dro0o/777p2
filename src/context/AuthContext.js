import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signin':
      return { errorMessage: '', token: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    default:
      return state
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

// Syntax is: arrow func returns function, specify both on top line
const signup = dispatch => async ({ email, password }) => {
  // make api request to sign up with email and password
  try {
    // if we sign up, modify our state and say that we are authed
    const response = await trackerApi.post('/signup', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signin', payload: response.data.token })

    // navigate to main flow
    navigate('TrackList')
  } catch (err) {
    console.log(err)
    // if sign up fails, reflect an error message
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with signup'
    })
  }
}

const signin = dispatch => async ({ email, password }) => {
  // try to sign in
  try {
    // handle success by updating state
    const response = await trackerApi.post('/signin', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    dispatch({ type: 'signin', payload: response.data.token })

    // navigate to main flow or track list
    navigate('TrackList')
  } catch (err) {
    // handle failure by showing error message
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    })
  }
}

const signout = dispatch => {
  return () => {
    // sign out somehow
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage },
  { token: null, errorMessage: '' }
)
