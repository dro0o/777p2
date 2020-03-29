import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Slider } from 'react-native-elements'
// import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { FontAwesome } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'

const AccountScreen = () => {
  const { signout } = useContext(AuthContext)
  return (
    <>
      {/* // <SafeAreaView forceInset={{ top: 'always' }}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <Spacer>
        <Button
          title='Sign Out'
          buttonStyle={{ backgroundColor: '#174591' }}
          titleStyle={{ color: 'white' }}
          onPress={signout}
        />
      </Spacer>
      {/* </SafeAreaView> */}
    </>
  )
}

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name='gears' size={28} />
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(45,72,46,1)',
    height: 88,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 13,
    fontWeight: '500'
  }
})

export default AccountScreen
