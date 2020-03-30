import axios from 'axios'
import { AsyncStorage } from 'react-native'

const instance = axios.create({
  baseURL: 'http://3f5662b4.ngrok.io'
})

instance.interceptors.request.use(
  // first is called when we are about to make request
  async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // second is called on error
  err => {
    return Promise.reject(err)
  }
)

export default instance
