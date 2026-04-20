import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api'
})

export const runningAPI = {
  getAll: () => API.get('/running/'),
  create: (data) => API.post('/running/', data)
}

export const pushupsAPI = {
  getAll: () => API.get('/pushups/'),
  create: (data) => API.post('/pushups/', data)
}

export const mealsAPI = {
  getAll: () => API.get('/meals/'),
  create: (data) => API.post('/meals/', data)
}

export const pointsAPI = {
  get: () => API.get('/points/'),
  reset: () => API.post('/points/reset')
}