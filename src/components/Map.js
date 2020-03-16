import React, { useContext } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Circle, Polyline, Polygon } from 'react-native-maps'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')
import { Context as LocationContext } from '../context/LocationContext'

const Map = () => {
  const {
    state: { currentLocation }
  } = useContext(LocationContext)

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        // starting map focus
        ...currentLocation.coords,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }}
      region={{
        // the map's focus now
        ...currentLocation.coords,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={120}
        strokeColor='rgba(158, 158, 255, 1.0)'
        fillColor='rgba(158, 158, 255, 0.3)'
      />
      {/* <Polyline coordinates={points} /> */}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 91 * vh
  }
})

export default Map
