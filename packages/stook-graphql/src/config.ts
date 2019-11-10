import { GraphqlConfig } from './types'
import clients from './clients'

export let graphqlConfig = {
  endpoint: '/graphql',
} as GraphqlConfig

export function config(options: GraphqlConfig) {
  clients.setupGraphqlClient(options)
  clients.setupSubscriptionClient(options)
  graphqlConfig = { ...graphqlConfig, ...options }
}
