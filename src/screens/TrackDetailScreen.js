import React, { useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Polyline } from 'react-native-maps'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext)
  const _id = navigation.getParam('_id')

  const track = state.find(t => t._id === _id)
  const initialCoords = track.locations[0].coords
  var initialDate = new Date(track.locations[0].timestamp)
  initialDate = initialDate.toLocaleString('en-US', {
    hour12: true
  })

  return (
    <>
      <View style={styles.trailInfo}>
        <Text style={styles.name}>{track.name}</Text>
        <Text style={styles.time}>{initialDate}</Text>
      </View>
      <MapView
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </>
  )
}

TrackDetailScreen.navigationOptions = {
  title: 'Trail Details',
  headerStyle: {
    backgroundColor: 'rgba(45,72,46,1)'
  },
  headerTitleStyle: {
    color: 'white'
  }
}

const styles = StyleSheet.create({
  map: {
    height: 81 * vh
  },
  trailInfo: {
    position: 'absolute',
    top: 2.5 * vh,
    padding: 10,
    zIndex: 9,
    backgroundColor: 'rgba(23,69,145, 0.9)',
    marginHorizontal: 5 * vw,
    borderRadius: 15,
    alignContent: 'center'
  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white'
  },
  time: {
    fontSize: 16,
    color: 'white',
    fontWeight: '400'
  }
})

export default TrackDetailScreen
