import React, { useState, useContext } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Text } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext)
  const [backgroundReq, setBackgroundReq] = useState(
    Math.random() > 0.5
      ? require('../../assets/avalanchelake_1.jpg')
      : require('../../assets/glacier_1.jpg')
  )

  return (
    <ImageBackground
      source={backgroundReq}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <AuthForm
          formText='Sign Up'
          errorMessage={state.errorMessage}
          onSubmit={signup}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signin')
          }}
        >
          <Spacer>
            <Text style={styles.link}>
              Already have an account? Sign in instead!
            </Text>
          </Spacer>
        </TouchableOpacity>
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
  },
  link: {
    color: '#2D482E',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default SignupScreen
