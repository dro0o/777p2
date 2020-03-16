import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'

const AccountScreen = () => {
  const { signout } = useContext(AuthContext)
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>AccountScreen</Text>
      <Spacer>
        <Button
          title='Sign Out'
          buttonStyle={{ backgroundColor: '#174591' }}
          titleStyle={{ color: 'white' }}
          onPress={signout}
        />
      </Spacer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default AccountScreen
