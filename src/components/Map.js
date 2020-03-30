import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, {
  Circle,
  Polyline,
  Polygon,
  Callout,
  Marker
} from 'react-native-maps'
import { vh } from '../components/Viewport'
import { Context as LocationContext } from '../context/LocationContext'
import { Context as LayerContext } from '../context/LayerContext'
import parkingImg from '../img/parking.png'
import peakImg from '../img/peak.png'
import poiImg from '../img/poi.png'
import roadImg from '../img/roads.png'
import trailImg from '../img/trail.png'
import trackImg from '../img/track.png'

const Map = ({ centerUser, followUser, goHome }) => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContext)
  const {
    state: { data, parking, peaks, pois, roads, tracks, trails }
  } = useContext(LayerContext)
  const [boundary, setBoundary] = useState(null)
  const [parkingGeo, setParkingGeo] = useState({
    parkingPolys: null,
    parkingMarkers: null
  })
  const [peakMarkers, setPeakMarkers] = useState(null)
  const [poiMarkers, setPoiMarkers] = useState(null)
  const [roadsGeo, setRoadsGeo] = useState({
    roadLines: null,
    roadMarkers: null
  })
  const [trailsGeo, setTrailsGeo] = useState({
    trailLines: null,
    trailMarkers: null
  })
  const [tracksGeo, setTracksGeo] = useState({
    trackLines: null,
    trackMarkers: null
  })

  // go home
  useEffect(() => {
    if (typeof _mapView !== 'undefined' && goHome > 0) {
      _mapView.animateCamera(
        {
          center: {
            latitude: 48.786267,
            longitude: -113.938344
          },
          altitude: 180000,
          pitch: 50,
          heading: 320,
          zoom: 10
        },
        2000
      )
    }
    console.log(goHome)
  }, [goHome])

  // enable center user location button
  useEffect(() => {
    if (typeof _mapView !== 'undefined' && centerUser > 0) {
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
    typeof _mapView !== 'undefined' && followUser
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

  // useEffect to update boundary
  useEffect(() => {
    var boundary = []
    try {
      data.boundaries.map(el => {
        boundary.push(
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
      setBoundary(boundary)
    } catch (err) {
      console.log('boundary load error:', err)
    }
  }, [data])

  // useEffect to only update parking layer when data changes
  useEffect(() => {
    var parkingPolys = []
    var parkingMarkers = []
    try {
      data.parking.map(el => {
        for (const [ind, poly] of el.location.coordinates.entries()) {
          parkingPolys.push(
            // parking polys
            <Polygon
              key={el._id.concat(ind.toString(), 'poly')}
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
          )
          parkingMarkers.push(
            // parking markers
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
      setParkingGeo({ parkingPolys, parkingMarkers })
    } catch (err) {
      console.log('parking poly error:', err)
    }
  }, [data])

  // useEffect for peaks array
  useEffect(() => {
    var peakMarkers = []
    try {
      data.peaks.map(el => {
        peakMarkers.push(
          // peak markers
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
      setPeakMarkers(peakMarkers)
    } catch (err) {
      console.log('peak marker error:', err)
    }
  }, [data])

  // useEffect for poi array
  useEffect(() => {
    var poiMarkers = []
    try {
      data.poi.map(el => {
        poiMarkers.push(
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
      setPoiMarkers(poiMarkers)
    } catch (err) {
      console.log('poi marker error:', err)
    }
  }, [data])

  // useEffect for roads layer
  useEffect(() => {
    var roadLines = []
    var roadMarkers = []
    try {
      data.roads.map(el => {
        for (const [ind, line] of el.location.coordinates.entries()) {
          roadLines.push(
            // road lines
            <Polyline
              key={el._id.concat(ind.toString(), 'roadsLine')}
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
          roadMarkers.push(
            // road markers
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
      setRoadsGeo({ roadLines, roadMarkers })
    } catch (err) {
      console.log('road geo error:', err)
    }
  }, [data])

  // update trails layer
  useEffect(() => {
    var trailLines = []
    var trailMarkers = []
    try {
      data.trails.map(el => {
        for (const [ind, line] of el.location.coordinates.entries()) {
          trailLines.push(
            // trail lines
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
          trailMarkers.push(
            // trail markers
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
      setTrailsGeo({ trailLines, trailMarkers })
    } catch (err) {
      console.log('trail geo error:', err)
    }
  }, [data])

  // update tracks layer
  useEffect(() => {
    var trackLines = []
    var trackMarkers = []
    try {
      data.tracks.map(el => {
        trackLines.push(
          // track lines
          <Polyline
            key={el._id.concat('tracksLine')}
            coordinates={el.locations.map(loc => ({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude
            }))}
            strokeColor='#ff0066'
            strokeWidth={1.5}
            lineJoin='bevel'
            lineDashPhase={2}
            lineDashPattern={[2, 3, 2]}
            tappable={true}
            onPress={() => {
              toggle(el)
            }}
          />
        )
        trackMarkers.push(
          // track markers
          <Marker
            key={el._id.concat('tracksMarker')}
            ref={ref => {
              el.marker = ref
              el.open = false
            }}
            coordinate={{
              latitude: el.locations[0].coords.latitude,
              longitude: el.locations[0].coords.longitude
            }}
            centerOffset={{ x: -0, y: -5 }}
            anchor={{ x: 0.69, y: 1 }}
            image={trackImg}
          >
            <Callout>
              <Text>{el.name}</Text>
            </Callout>
          </Marker>
        )
      })
      setTracksGeo({ trackLines, trackMarkers })
    } catch (err) {
      console.log('track geo error:', err)
    }
  }, [data])

  if (!currentLocation) {
    return <ActivityIndicator size='large' style={{ marginTop: 200 }} />
  }

  // Function to handle toggling each non marker geo element's callout
  function toggle(el) {
    // el.marker.showCallout()
    console.log(el.open)
    el.open ? el.marker.hideCallout() : el.marker.showCallout()
    el.open = !el.open
  }

  // Function to send camera to home position over Glacier

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
      {boundary}
      {parkingGeo.parkingPolys && parking ? parkingGeo.parkingPolys : null}
      {parkingGeo.parkingMarkers && parking ? parkingGeo.parkingMarkers : null}
      {peakMarkers && peaks ? peakMarkers : null}
      {poiMarkers && pois ? poiMarkers : null}
      {roadsGeo.roadLines && roads ? roadsGeo.roadLines : null}
      {roadsGeo.roadMarkers && roads ? roadsGeo.roadMarkers : null}
      {trailsGeo.trailLines && trails ? trailsGeo.trailLines : null}
      {trailsGeo.trailMarkers && trails ? trailsGeo.trailMarkers : null}
      {tracksGeo.trackLines && tracks ? tracksGeo.trackLines : null}
      {tracksGeo.trackMarkers && tracks ? tracksGeo.trackMarkers : null}
      <UserLoc />
      <Polyline
        strokeColor='#ffa500'
        strokeWidth={1.5}
        coordinates={locations.map(loc => loc.coords)}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 81 * vh
  }
})

export default Map
