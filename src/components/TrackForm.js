import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext)
  const [saveTrack] = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input
          onChangeText={changeName}
          placeholder='Enter trail name'
          value={name}
        />
      </Spacer>
      {recording ? (
        <Button
          title='Stop Blazing'
          onPress={stopRecording}
          buttonStyle={styles.button}
        />
      ) : (
        <Button
          title='Blaze a Trail!'
          onPress={startRecording}
          buttonStyle={styles.button}
        ></Button>
      )}
      {!recording && locations.length ? (
        <Button
          title='Save Blazed Trail'
          onPress={saveTrack}
          buttonStyle={styles.saveButton}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D482E',
    marginHorizontal: 50
  },
  saveButton: {
    backgroundColor: '#174591',
    marginHorizontal: 50,
    marginTop: 10
  }
})

export default TrackForm
