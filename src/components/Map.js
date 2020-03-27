import React, { useState, useContext } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Circle, Polyline, Polygon } from 'react-native-maps'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')
import { Context as LocationContext } from '../context/LocationContext'
import { Context as LayerContext } from '../context/LayerContext'

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext)
  const {
    state: { data, parking, peaks, pois, roads, tracks, trails }
  } = useContext(LayerContext)

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  }

  function Boundary() {
    return data.boundaries.map(el => {
      return (
        <Polygon
          key={data.boundaries[0]._id}
          coordinates={data.boundaries[0].location.coordinates[0].map(
            coords => ({ latitude: coords[1], longitude: coords[0] })
          )}
          strokeColor='#000'
          fillColor='rgba(0,255,0,0.2)'
          strokeWidth={1}
          tappable={true}
        />
      )
    })
  }

  function Parking(parking) {
    return !parking
      ? null
      : data.parking.map(el => {
          for (const [ind, poly] of el.location.coordinates.entries()) {
            return (
              <Polygon
                key={el._id.concat(ind.toString())}
                coordinates={poly[0].map(coords => ({
                  latitude: coords[1],
                  longitude: coords[0]
                }))}
                strokeColor='#000'
                fillColor='rgba(255,0,0,0.5)'
                strokeWidth={1}
                tappable={true}
              />
            )
          }
        })
  }
  function Peaks(peaks) {
    return !peaks ? null : null
  }
  function POIs(pois) {
    return !pois ? null : null
  }
  function Roads(roads) {
    return !roads ? null : null
  }
  function Tracks(tracks) {
    return !tracks ? null : null
  }
  function Trails(trails) {
    return !trails ? null : null
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        // starting map focus
        ...currentLocation.coords,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8
      }}
      // region={{
      //   // the map's focus now
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.1,
      //   longitudeDelta: 0.1
      // }}
    >
      <Boundary />
      <Parking />
      <Peaks />
      <POIs />
      <Roads />
      <Tracks />
      <Trails />
      <Circle
        center={currentLocation.coords}
        radius={120}
        strokeColor='rgba(158, 158, 255, 1.0)'
        fillColor='rgba(158, 158, 255, 0.3)'
      />
      <Polyline coordinates={locations.map(loc => loc.coords)} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 91 * vh
  }
})

export default Map
