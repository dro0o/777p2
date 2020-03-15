import React, { useContext } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLInk'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext)

  return (
    <ImageBackground
      source={require('../../assets/glacier_1.jpg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <AuthForm
          formText='Sign In'
          errorMessage={state.errorMessage}
          onSubmit={signin}
        />
        <NavLink routeName='Signup' text="Don't have an account? Sign up!" />
      </View>
    </ImageBackground>
  )
}

// Hide the header, can be function returning object
// or just an object itself
SigninScreen.navigationOptions = () => {
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

export default SigninScreen
