import axios from 'axios'

const api = axios.create({
  baseURL: 'https://travelblog.skillbox.cc/api',
})

export default api
