import axios, { AxiosInstance } from 'axios'

const apiURL = import.meta.env.VITE_API_URL

const $host: AxiosInstance = axios.create({
  baseURL: apiURL,
})

export { $host }