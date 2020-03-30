// import '../_mockLocation'
import React, { useState, useContext, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import { Text } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { vw, vh } from '../components/Viewport'

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext)
  const [goHome, setGoHome] = useState(0)
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

  function GoHomeLoc() {
    return (
      <TouchableOpacity
        style={[styles.goHomeButton]}
        onPress={() => {
          setGoHome(goHome + 1)
        }}
      >
        <FontAwesome name='home' size={25} color='white' />
      </TouchableOpacity>
    )
  }

  function CenterUserLoc() {
    return (
      <TouchableOpacity
        style={[styles.centerUserButton]}
        onPress={() => {
          setCenterUser(centerUser + 1)
        }}
      >
        <FontAwesome name='location-arrow' size={25} color='white' />
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
        <MaterialIcons name='my-location' size={25} color='white' />
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
          <Map
            centerUser={centerUser}
            followUser={followUser}
            goHome={goHome}
          />
        </View>
        <View style={styles.form}>
          {err ? <Text>Please enable location services</Text> : null}
          <TrackForm />
        </View>
        <View style={styles.goHomeView}>
          <GoHomeLoc />
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
    width: 76 * vw,
    zIndex: 9
  },
  goHomeView: {
    position: 'absolute',
    top: 12.5 * vh,
    left: 80 * vw,
    height: 42,
    width: 42,
    zIndex: 9
  },
  centerUserView: {
    position: 'absolute',
    top: 16.25 * vh,
    left: 89 * vw,
    height: 42,
    width: 42,
    zIndex: 9
  },
  lockUserView: {
    position: 'absolute',
    top: 20 * vh,
    left: 80 * vw,
    height: 42,
    width: 42,
    zIndex: 9
  },
  goHomeButton: {
    borderRadius: 35,
    backgroundColor: 'rgba(23,69,145, 1)',
    padding: 9
  },
  centerUserButton: {
    borderRadius: 35,
    backgroundColor: 'rgba(23,69,145, 1)',
    padding: 10
  },
  lockUserButton: {
    borderRadius: 35,
    padding: 8
  }
})

export default withNavigationFocus(TrackCreateScreen)
