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
    <View style={styles.form}>
      <Spacer>
        <Input
          onChangeText={changeName}
          placeholder='Enter trail name'
          value={name}
          inputStyle={styles.input}
          placeholderTextColor='white'
          inputContainerStyle={{ borderBottomColor: 'white' }}
        />
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
      </Spacer>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'rgba(45,72,46, 0.75)',
    borderRadius: 15
  },
  input: {
    color: 'white'
  },
  button: {
    backgroundColor: 'rgba(23,69,145, 1)',
    marginHorizontal: 5,
    marginTop: 10
  },
  saveButton: {
    backgroundColor: '#174591',
    marginHorizontal: 5,
    marginTop: 10
  }
})

export default TrackForm
