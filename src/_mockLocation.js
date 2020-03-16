import * as Location from 'expo-location'

// Testing purposes to simulate user moving around
const someDistanceWithDegrees = 0.001

const getLocation = increment => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -113.8070624 + increment * someDistanceWithDegrees,
      latitude: 48.6460847 + increment * someDistanceWithDegrees
    }
  }
}

let counter = 0
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  })
  counter++
}, 1000)
