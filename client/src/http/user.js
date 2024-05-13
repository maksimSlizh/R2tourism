import { $host } from './api.js'

export const registration = async(email, password) => {
  const response = await $host.post('auth/registration', { email, password })
  console.log(response)
  return response.data
}

export const login = async(email, password, username = '') => {
  console.log(email, password, username, $host)
  const response = await $host.post('auth/login', { email, password, username })
  console.log(response)
  return response.data
}
