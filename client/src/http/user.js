import { $host } from './api.js'

export const registration = async(email, password) => {
  const response = await $host.post('auth/registration', { email, password })
  return response.data
}

export const login = async(email, password, username = '') => {
  const response = await $host.post('auth/login', { email, password, username })
  return response.data
}
