import { Client } from './Client'

let baseURL: string = ''

if (typeof window !== 'undefined') {
  baseURL = window.location.protocol + '//' + window.location.host
}

const client = new Client({ baseURL })
const { fetch, useFetch, useUpdate, config, applyMiddleware } = client

export * from './types'
export * from './fetcher'
export { Client, config, fetch, useFetch, useUpdate, applyMiddleware }
