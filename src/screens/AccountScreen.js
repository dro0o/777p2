import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
// import { SafeAreaView } from 'react-navigation'
import Spacer from '../components/Spacer'
import { FontAwesome } from '@expo/vector-icons'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as LayerContext } from '../context/LayerContext'

const AccountScreen = () => {
  const { signout } = useContext(AuthContext)
  const {
    state: { parking, peaks, pois, roads, tracks, trails },
    toggleLayer
  } = useContext(LayerContext)
  return (
    <>
      {/* // <SafeAreaView forceInset={{ top: 'always' }}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            color: '#174591',
            fontWeight: 'bold'
          }}
        >
          Layer Toggles
        </Text>
        <CheckBox
          title='Park Trails'
          checked={trails}
          onPress={() => toggleLayer('trails')}
        />
        <CheckBox
          title='Mountain Peaks'
          checked={peaks}
          onPress={() => toggleLayer('peaks')}
        />
        <CheckBox
          title='Points of Interest'
          checked={pois}
          onPress={() => toggleLayer('pois')}
        />
        <CheckBox
          title='Parking Lots'
          checked={parking}
          onPress={() => toggleLayer('parking')}
        />
        <CheckBox
          title='Park Roads'
          checked={roads}
          onPress={() => toggleLayer('roads')}
        />
        <CheckBox
          title='User Blazed Trails'
          checked={tracks}
          onPress={() => toggleLayer('tracks')}
        />
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
