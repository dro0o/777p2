import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'

const SigninScreen = () => {
  return (
    <>
      <Text h3>Sign In</Text>
      <Input label='Email' />
      <Input label='Password' />
      <Button title='Sign In' />
    </>
  )
}

const styles = StyleSheet.create({})

export default SigninScreen
