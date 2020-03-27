import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const layerReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_layers':
      return { ...state, data: action.payload }
    case 'toggle_parking':
      return { ...state, parking: !state.parking }
    case 'toggle_peaks':
      return { ...state, peaks: !state.peaks }
    case 'toggle_pois':
      return { ...state, pois: !state.pois }
    case 'toggle_roads':
      return { ...state, roads: !state.roads }
    case 'toggle_tracks':
      return { ...state, tracks: !state.tracks }
    case 'toggle_trails':
      return { ...state, trails: !state.trails }
    default:
      return state
  }
}

const fetchLayers = dispatch => async ({ distance, lon, lat }) => {
  const response = await trackerApi.get(
    `/layers/{"distance":"${distance.toString()}", "lon":"${lon.toString()}", "lat":"${lat.toString()}"}`
  )
  dispatch({ type: 'fetch_layers', payload: response.data })
}

const toggleLayer = dispatch => layer => {
  layer === 'parking'
    ? dispatch({ type: 'toggle_parking' })
    : layer === 'peaks'
    ? dispatch({ type: 'toggle_peaks' })
    : layer === 'pois'
    ? dispatch({ type: 'toggle_pois' })
    : layer === 'roads'
    ? dispatch({ type: 'toggle_roads' })
    : layer === 'tracks'
    ? dispatch({ type: 'toggle_tracks' })
    : layer === 'trails'
    ? dispatch({ type: 'toggle_trails' })
    : null
}

export const { Provider, Context } = createDataContext(
  layerReducer,
  { fetchLayers, toggleLayer },
  {
    parking: true,
    peaks: true,
    pois: true,
    roads: true,
    tracks: true,
    trails: true
  }
)
