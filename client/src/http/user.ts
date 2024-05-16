import { AxiosResponse } from 'axios'
import { $host } from './api.js'
import { AuthData } from '../types/interfaces'

export const registration = async (email: string, password: string, username: string = ''): Promise<AuthData> => {
  try {
    const response: AxiosResponse = await $host.post('auth/register', { email, password, username })
    return response.data
  }
  catch (e: any) { throw new Error(e.response || 'Something went wrong') }
}

export const login = async (email: string, password: string,): Promise<AuthData> => {
  try {
    const response: AxiosResponse = await $host.post('auth/login', { email, password })
    return response.data
  }
  catch (e: any) { throw new Error(e.response || 'Something went wrong') }
}
