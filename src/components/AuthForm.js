import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({ formText, errorMessage, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Spacer>
        <Text h4 style={{ color: '#174591', fontWeight: 'bold' }}>
          Glacier Social {formText}
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
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={formText}
          buttonStyle={{ backgroundColor: '#174591' }}
          titleStyle={{ color: 'white' }}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
})

export default AuthForm
