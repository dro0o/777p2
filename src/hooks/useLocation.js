import { useState, useEffect } from 'react'
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)
  const [subscriber, setSubsriber] = useState(null)

  const startWatching = async () => {
    try {
      await requestPermissionsAsync()
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        callback
      )
      setSubsriber(sub)
    } catch (e) {
      setErr(e)
    }
  }

  useEffect(() => {
    shouldTrack ? startWatching() : subscriber.remove() && setSubsriber(null)
  }, [shouldTrack])

  return [err]
}
