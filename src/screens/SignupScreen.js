import React, { useContext } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLInk'
import { vh } from '../components/Viewport'

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext)
  console.log('here')

  return (
    <ImageBackground
      source={require('../../assets/avalanchelake_1.jpg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <AuthForm
          formText='Sign Up'
          errorMessage={state.errorMessage}
          onSubmit={signup}
        />
        <NavLink
          routeName='Signin'
          text='Already have an account? Sign in instead!'
        />
      </View>
    </ImageBackground>
  )
}

// Hide the header, can be function returning object
// or just an object itself
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#2D482E',
    marginTop: 20 * vh,
    margin: 10,
    backgroundColor: 'rgba(252, 252, 252, 0.55)',
    borderRadius: 25
  }
})

export default SignupScreen
