import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const vw = width / 100
const vh = height / 100

export { vw, vh }
