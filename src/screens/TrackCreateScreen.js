// import '../_mockLocation'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import { Text, Button } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext)
  const [centerUser, setCenterUser] = useState(0)
  const [followUser, setFollowUser] = useState(false)
  const callback = useCallback(
    location => {
      // prevents issue with ref to original callback, bug in useEffect
      addLocation(location, recording)
    },
    [recording]
  )
  const [err] = useLocation(isFocused || recording, callback)

  const conditionalColor = followUser
    ? { backgroundColor: 'rgba(23,69,145, 1)' }
    : { backgroundColor: 'rgba(23,69,145, 0.5)' }

  function CenterUserLoc() {
    return (
      <TouchableOpacity
        style={[styles.centerUserButton]}
        onPress={() => {
          setCenterUser(centerUser + 1)
        }}
      >
        <FontAwesome name='location-arrow' size={35} color='white' />
      </TouchableOpacity>
    )
  }

  function LockUserLoc() {
    return (
      <TouchableOpacity
        style={[styles.lockUserButton, conditionalColor]}
        onPress={() => {
          setFollowUser(!followUser)
        }}
      >
        <MaterialIcons name='my-location' size={35} color='white' />
      </TouchableOpacity>
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Glacier National Park</Text>
        </View>
        <View style={styles.map}>
          <Map centerUser={centerUser} followUser={followUser} />
        </View>
        <View style={styles.form}>
          {err ? <Text>Please enable location services</Text> : null}
          <TrackForm />
        </View>
        <View style={styles.centerUserView}>
          <CenterUserLoc />
        </View>
        <View style={styles.lockUserView}>
          <LockUserLoc />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

TrackCreateScreen.navigationOptions = {
  title: 'Map',
  tabBarIcon: <FontAwesome name='map' size={20} />
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
  },
  map: {
    top: 88,
    height: 71 * vh,
    width: 100 * vw,
    position: 'absolute',
    zIndex: 1
  },
  form: {
    position: 'absolute',
    top: 11 * vh,
    marginLeft: 10,
    height: 10 * vh,
    width: 80 * vw,
    zIndex: 9
  },
  centerUserView: {
    position: 'absolute',
    top: 15 * vh,
    left: 85 * vw,
    height: 55,
    width: 55,
    zIndex: 9
  },
  lockUserView: {
    position: 'absolute',
    top: 22 * vh,
    left: 85 * vw,
    height: 55,
    width: 55,
    zIndex: 9
  },
  centerUserButton: {
    borderRadius: 40,
    backgroundColor: 'rgba(23,69,145, 1)',
    padding: 11
  },
  lockUserButton: {
    borderRadius: 40,
    padding: 10
  }
})

export default withNavigationFocus(TrackCreateScreen)
