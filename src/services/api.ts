import axios from 'axios'

const api = axios.create({
  baseURL: 'https://travelblog.skillbox.cc/api',
  withCredentials: true,
})

export default api
