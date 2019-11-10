import { RestConfig } from './types'

export let restConfig = {
  endpoint: window.location.protocol + '//' + window.location.host,
} as RestConfig

export function config(options: RestConfig) {
  restConfig = { ...restConfig, ...options }
}
