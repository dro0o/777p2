import React, { useContext } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'
import { Context as LayerContext } from '../context/LayerContext'

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext)
  const { fetchLayers } = useContext(LayerContext)

  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <NavigationEvents
        onWillFocus={() => fetchLayers({ distance: 0, lon: 0, lat: 0 })}
      />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackDetail', { _id: item._id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

TrackListScreen.navigationOptions = {
  title: 'Trails',
  headerStyle: {
    backgroundColor: 'rgba(45,72,46,1)'
  },
  headerTitleStyle: {
    color: 'white'
  }
}

const styles = StyleSheet.create({})

export default TrackListScreen
