import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Foundation } from '@expo/vector-icons'
import AccountScreen from './src/screens/AccountScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'
import { Provider as LayerProvider } from './src/context/LayerContext'

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: 'Trails',
  tabBarIcon: <Foundation name='trees' size={30} />
}
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  // lowercase as convention for group, not screen (capped)
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <LayerProvider>
      <TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <App
              ref={navigator => {
                setNavigator(navigator)
              }}
            />
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    </LayerProvider>
  )
}
