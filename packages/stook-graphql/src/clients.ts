import { GraphQLClient } from '@peajs/graphql-client'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { GraphqlConfig, Options } from './types'

const NULL_AS: any = null

const clients = {
  graphqlClient: NULL_AS as GraphQLClient,
  subscriptionClient: NULL_AS as SubscriptionClient,
  setupGraphqlClient(options: GraphqlConfig) {
    const { endpoint } = options
    const defaultOpt = { headers: {} }
    let opt: Options = options || defaultOpt
    clients.graphqlClient = new GraphQLClient({ endpoint, headers: opt.headers as any })
  },

  setupSubscriptionClient(options: GraphqlConfig) {
    const { subscriptionsEndpoint = '' } = options
    if (!subscriptionsEndpoint) return
    clients.subscriptionClient = new SubscriptionClient(subscriptionsEndpoint, {
      reconnect: true,
    })
  },
}
export default clients
