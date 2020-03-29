import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, {
  Circle,
  Polyline,
  Polygon,
  Callout,
  Marker
} from 'react-native-maps'
var { vw, vh, vmin, vmax } = require('react-native-viewport-units')
import { Context as LocationContext } from '../context/LocationContext'
import { Context as LayerContext } from '../context/LayerContext'

const Map = ({ centerUser, followUser }) => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext)
  const {
    state: { data, parking, peaks, pois, roads, tracks, trails }
  } = useContext(LayerContext)

  // enable center user location button
  useEffect(() => {
    if (centerUser > 0) {
      var userLat = currentLocation.coords.latitude
      var userLon = currentLocation.coords.longitude
      _mapView.animateCamera(
        {
          center: {
            latitude: userLat,
            longitude: userLon
          },
          altitude: 6000,
          pitch: 50,
          zoom: 50
        },
        1000
      )
    }
  }, [centerUser])

  // enable lock user location button
  useEffect(() => {
    followUser
      ? _mapView.animateCamera(
          {
            center: {
              ...currentLocation.coords
            },
            altitude: 3000,
            pitch: 50,
            zoom: 30
          },
          1000
        )
      : null
  }, [currentLocation])

  // attempt to build parking arrays to bypass view poly callout issue
  // useEffect(() => {
  //   try {
  //     var parkingPolys = []
  //     var parkingMarkers = []
  //     !parking
  //       ? null
  //       : data.parking.map(el => {
  //           for (const [ind, poly] of el.location.coordinates.entries()) {
  //             parkingPolys.push(
  //               <Polygon
  //                 // key={el._id.concat(ind.toString(), 'poly')}
  //                 coordinates={poly[0].map(coords => ({
  //                   latitude: coords[1],
  //                   longitude: coords[0]
  //                 }))}
  //                 strokeColor='#000'
  //                 fillColor='rgba(255,0,0,0.5)'
  //                 strokeWidth={1}
  //                 tappable={true}
  //                 onPress={() => {
  //                   toggle(poly)
  //                 }}
  //               />
  //             )
  //             parkingMarkers.push(
  //               <Marker
  //                 ref={ref => {
  //                   poly.marker = ref
  //                   // poly.open = false
  //                 }}
  //                 coordinate={{
  //                   latitude: poly[0][0][1],
  //                   longitude: poly[0][0][0]
  //                 }}
  //               >
  //                 <Callout>
  //                   <Text>Hello</Text>
  //                 </Callout>
  //               </Marker>
  //             )
  //           }
  //         })
  //   } catch (err) {
  //     var parkingPolys = []
  //     var parkingMarkers = []
  //     console.log('parking error', err)
  //   }
  // }, [data])

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  }

  console.log(centerUser, followUser, typeof currentLocation.coords.latitude)

  function Boundary() {
    try {
      return data.boundaries.map(el => {
        return (
          <Polygon
            key={data.boundaries[0]._id}
            coordinates={data.boundaries[0].location.coordinates[0].map(
              coords => ({ latitude: coords[1], longitude: coords[0] })
            )}
            strokeColor='#2D482E'
            fillColor='rgba(45,172,46,0.2)'
            strokeWidth={2}
            tappable={true}
          />
        )
      })
    } catch (err) {
      return null
    }
  }

  // parking
  // var parkingPolys = []
  // var parkingMarkers = []
  // try {
  //   return !parking
  //     ? null
  //     : data.parking.map(el => {
  //         for (const [ind, poly] of el.location.coordinates.entries()) {

  //           parkingPolys.push(
  //               <Polygon
  //                 // key={el._id.concat(ind.toString(), 'poly')}
  //                 coordinates={poly[0].map(coords => ({
  //                   latitude: coords[1],
  //                   longitude: coords[0]
  //                 }))}
  //                 strokeColor='#000'
  //                 fillColor='rgba(255,0,0,0.5)'
  //                 strokeWidth={1}
  //                 tappable={true}
  //                 onPress={() => {
  //                   toggle(poly)
  //                 }}
  //               />
  //           )
  //           parkingMarkers.push(
  //               <Marker
  //                 ref={ref => {
  //                   poly.marker = ref
  //                   // poly.open = false
  //                 }}
  //                 coordinate={{
  //                   latitude: poly[0][0][1],
  //                   longitude: poly[0][0][0]
  //                 }}
  //               >
  //                 <Callout>
  //                   <Text>Hello</Text>
  //                 </Callout>
  //               </Marker>
  //           )
  //         }
  //       })
  // } catch (err) {
  //   return null
  // }

  function toggle(el) {
    el.open ? el.marker.hideCallout() : el.marker.showCallout()
    el.open = !el.open
  }

  function Parking() {
    try {
      return !parking
        ? null
        : data.parking.map(el => {
            for (const [ind, poly] of el.location.coordinates.entries()) {
              console.log(poly[0][0][1])
              return (
                <View key={el._id.concat(ind.toString(), 'view')}>
                  <Polygon
                    // key={el._id.concat(ind.toString(), 'poly')}
                    coordinates={poly[0].map(coords => ({
                      latitude: coords[1],
                      longitude: coords[0]
                    }))}
                    strokeColor='#000'
                    fillColor='rgba(255,0,0,0.5)'
                    strokeWidth={1}
                    tappable={true}
                    onPress={() => {
                      toggle(poly)
                    }}
                  />
                  <Marker
                    ref={ref => {
                      poly.marker = ref
                      // poly.open = false
                    }}
                    coordinate={{
                      latitude: poly[0][0][1],
                      longitude: poly[0][0][0]
                    }}
                  >
                    <Callout>
                      <Text>Hello</Text>
                    </Callout>
                  </Marker>
                </View>
              )
            }
          })
    } catch (err) {
      return null
    }
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

  // Shows user's location as small purple circle
  function UserLoc() {
    return (
      <Circle
        center={currentLocation.coords}
        radius={120}
        strokeColor='rgba(158, 158, 255, 1.0)'
        fillColor='rgba(158, 158, 255, 0.3)'
      />
    )
  }

  return (
    <MapView
      ref={mapView => {
        _mapView = mapView
      }}
      style={styles.map}
      initialRegion={{
        latitude: 48.686267,
        longitude: -113.838344,
        latitudeDelta: 1.2,
        longitudeDelta: 1.2
      }}
    >
      <Boundary />
      {/* <Parking /> */}
      {parkingPolys}
      {parkingMarkers}
      <Peaks />
      <POIs />
      <Roads />
      <Tracks />
      <Trails />
      <UserLoc />
      <Polyline coordinates={locations.map(loc => loc.coords)} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 81 * vh
  }
})

export default Map
