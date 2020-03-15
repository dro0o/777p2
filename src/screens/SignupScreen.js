import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, ImageBackground } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        <Spacer>
          <Text h4 style={{ color: '#174591', fontWeight: 'bold' }}>
            Glacier Social Sign Up
          </Text>
        </Spacer>
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          label='Email'
          labelStyle={{ color: '#2D482E' }}
          value={email}
          onChangeText={setEmail}
        />
        <Spacer />
        <Input
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry //true
          label='Password'
          labelStyle={{ color: '#2D482E' }}
          value={password}
          onChangeText={setPassword}
        />
        <Spacer>
          <Button
            title='Sign Up'
            buttonStyle={{ backgroundColor: '#174591' }}
            titleStyle={{ color: 'white' }}
            onPress={() => signup({ email, password })}
          />
        </Spacer>
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
