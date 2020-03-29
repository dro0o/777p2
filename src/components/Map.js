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
import parkingImg from '../img/parking.png'
import peakImg from '../img/peak.png'
import poiImg from '../img/poi.png'
import roadImg from '../img/roads.png'
import trailImg from '../img/trail.png'

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

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  }

  console.log(centerUser, followUser, typeof currentLocation.coords.latitude)

  // Function to handle toggling each non marker geo element's callout
  function toggle(el) {
    // el.marker.showCallout()
    console.log(el.open)
    el.open ? el.marker.hideCallout() : el.marker.showCallout()
    el.open = !el.open
  }

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
  function ParkingPolygons() {
    try {
      return !parking
        ? null
        : data.parking.map(el => {
            for (const [ind, poly] of el.location.coordinates.entries()) {
              return (
                <Polygon
                  key={el._id.concat(ind.toString(), 'poly')}
                  coordinates={poly[0].map(coords => ({
                    latitude: coords[1],
                    longitude: coords[0]
                  }))}
                  strokeColor='#000'
                  fillColor='rgba(255,0,0,0.5)'
                  strokeWidth={1}
                  // tappable={true}
                  onPress={() => {
                    toggle(poly)
                  }}
                />
              )
            }
          })
    } catch (err) {
      return null
    }
  }
  function ParkingMarkers() {
    try {
      return !parking
        ? null
        : data.parking.map(el => {
            for (const [ind, poly] of el.location.coordinates.entries()) {
              return (
                <Marker
                  key={el._id.concat(ind.toString(), 'marker')}
                  ref={ref => {
                    poly.marker = ref
                    poly.open = false
                  }}
                  coordinate={{
                    latitude: poly[0][0][1],
                    longitude: poly[0][0][0]
                  }}
                  centerOffset={{ x: -0, y: -5 }}
                  anchor={{ x: 0.69, y: 1 }}
                  image={parkingImg}
                >
                  <Callout>
                    <Text>{el.name}</Text>
                  </Callout>
                </Marker>
              )
            }
          })
    } catch (err) {
      return null
    }
  }
  function Peaks() {
    try {
      return !peaks
        ? null
        : data.peaks.map(el => {
            return (
              <Marker
                key={el._id.concat('peakMarker')}
                coordinate={{
                  latitude: el.location.coordinates[1],
                  longitude: el.location.coordinates[0]
                }}
                centerOffset={{ x: -0, y: -5 }}
                anchor={{ x: 0.69, y: 1 }}
                image={peakImg}
              >
                <Callout>
                  <Text>{el.name}</Text>
                </Callout>
              </Marker>
            )
          })
    } catch (err) {
      console.log(err)
      return null
    }
  }
  function POIs() {
    try {
      return !pois
        ? null
        : data.poi.map(el => {
            return (
              <Marker
                key={el._id.concat('poiMarker')}
                coordinate={{
                  latitude: el.location.coordinates[1],
                  longitude: el.location.coordinates[0]
                }}
                centerOffset={{ x: -0, y: -5 }}
                anchor={{ x: 0.69, y: 1 }}
                image={poiImg}
              >
                <Callout>
                  <Text>{el.name}</Text>
                  <Text>{el.properties.POITYPE}</Text>
                </Callout>
              </Marker>
            )
          })
    } catch (err) {
      console.log(err)
      return null
    }
  }
  function RoadPolylines() {
    try {
      return !roads
        ? null
        : data.roads.map(el => {
            for (const [ind, line] of el.location.coordinates.entries()) {
              return (
                <Polyline
                  key={el._id.concat(ind.toString(), 'roadsPoly')}
                  coordinates={line.map(coords => ({
                    latitude: coords[1],
                    longitude: coords[0]
                  }))}
                  strokeColor='#34495E'
                  strokeWidth={1.5}
                  lineJoin='bevel'
                  tappable={true}
                  onPress={() => {
                    toggle(line)
                  }}
                />
              )
            }
          })
    } catch (err) {
      return null
    }
  }

  function RoadMarkers() {
    try {
      return !roads
        ? null
        : data.roads.map(el => {
            for (const [ind, line] of el.location.coordinates.entries()) {
              return (
                <Marker
                  key={el._id.concat(ind.toString(), 'roadsMarker')}
                  ref={ref => {
                    line.marker = ref
                    line.open = false
                  }}
                  coordinate={{
                    latitude: line[0][1],
                    longitude: line[0][0]
                  }}
                  centerOffset={{ x: -0, y: -5 }}
                  anchor={{ x: 0.69, y: 1 }}
                  image={roadImg}
                >
                  <Callout>
                    <Text>{el.name}</Text>
                  </Callout>
                </Marker>
              )
            }
          })
    } catch (err) {
      return null
    }
  }
  function Tracks(tracks) {
    return !tracks ? null : null
  }
  function TrailPolylines() {
    try {
      return !trails
        ? null
        : data.trails.map(el => {
            for (const [ind, line] of el.location.coordinates.entries()) {
              return (
                <Polyline
                  key={el._id.concat(ind.toString(), 'trailsLine')}
                  coordinates={line.map(coords => ({
                    latitude: coords[1],
                    longitude: coords[0]
                  }))}
                  strokeColor='#2D482E'
                  strokeWidth={1.5}
                  lineJoin='bevel'
                  lineDashPhase={2}
                  lineDashPattern={[2, 3, 2]}
                  tappable={true}
                  onPress={() => {
                    toggle(line)
                  }}
                />
              )
            }
          })
    } catch (err) {
      return null
    }
  }

  function TrailMarkers() {
    try {
      return !trails
        ? null
        : data.trails.map(el => {
            for (const [ind, line] of el.location.coordinates.entries()) {
              return (
                <Marker
                  key={el._id.concat(ind.toString(), 'trailsMarker')}
                  ref={ref => {
                    line.marker = ref
                    line.open = false
                  }}
                  coordinate={{
                    latitude: line[0][1],
                    longitude: line[0][0]
                  }}
                  centerOffset={{ x: -0, y: -5 }}
                  anchor={{ x: 0.69, y: 1 }}
                  image={trailImg}
                >
                  <Callout>
                    <Text>{el.name}</Text>
                  </Callout>
                </Marker>
              )
            }
          })
    } catch (err) {
      return null
    }
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
      <ParkingPolygons />
      <ParkingMarkers />
      <Peaks />
      <POIs />
      <RoadPolylines />
      <RoadMarkers />
      <Tracks />
      <TrailPolylines />
      <TrailMarkers />
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
