import '../_mockLocation'
import React, { useContext, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome } from '@expo/vector-icons'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext)
  const callback = useCallback(
    location => {
      // prevents issue with ref to original callback, bug in useEffect
      addLocation(location, recording)
    },
    [recording]
  )
  const [err] = useLocation(isFocused || recording, callback)

  return (
    // <>
    <View style={{ flex: 1 }}>
      <View style={styles.map}>
        <Map />
      </View>
      <View style={styles.form}>
        {err ? <Text>Please enable location services</Text> : null}
        <TrackForm />
      </View>
    </View>
    // </>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Map',
  tabBarIcon: <FontAwesome name='map' size={20} />
}

const styles = StyleSheet.create({
  view: {
    position: 'absolute'
  },
  map: {
    top: 0,
    height: 91 * vh,
    width: 100 * vw,
    position: 'absolute',
    zIndex: 1
  },
  form: {
    position: 'absolute',
    top: 3 * vh,
    height: 10 * vh,
    width: 100 * vw,
    zIndex: 9
  }
})

export default withNavigationFocus(TrackCreateScreen)
