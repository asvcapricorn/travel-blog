import axios from 'axios'

const api = axios.create({
  baseURL: 'https://travelblog.skillbox.cc',
  withCredentials: true,
})

export default api
