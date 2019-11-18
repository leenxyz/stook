import React, { useState, useEffect } from 'react'
import gql from 'gql-tag'

import { config, query, useQuery, useMutate, fetcher, useSubscribe, fromSubscription } from '../src'

import { Storage } from 'stook'

export const GET_USER = gql`
  query GetUser($login: String!) {
    user(login: $login) {
      _id
      login
      avatar
      nickname
      username
      email
      intro
      token
    }
  }
`

function handleResponse(result: any) {
  if (typeof result !== 'object') return result
  if (Object.keys(result).length === 1) {
    return result[Object.keys(result)[0]]
  }
  return result
}

function setToken(config: any) {
  config.headers = {
    ...config.headers,
    Authorization: `bearer token...`,
  }
  return config
}

config({
  // endpoint: 'http://localhost:7001/graphql',
  // endpoint: 'https://graphql-compose.herokuapp.com/user',
  endpoint: 'http://localhost:5001/graphql',
  subscriptionsEndpoint: 'ws://localhost:5001/graphql',
  interceptor: {
    responses: [handleResponse],
    requests: [setToken],
  },
})

export const GET_PROJECT = gql`
  query getProject($slug: String!) {
    project(slug: $slug) {
      _id
      name
    }
  }
`

const GET_USER_BY_ID = gql`
  query User($_id: MongoID!) {
    userById(_id: $_id) {
      _id
      name
      gender
      age
    }
  }
`

const SUB = gql`
  subscription notice {
    normalSubscription {
      id
      date
      message
    }
  }
`

const GET_NOTICE = gql`
  {
    notification {
      id
      message
      date
    }
  }
`

fromSubscription(SUB).subscribe({
  next(data: any) {
    console.log('data:', data)
  },
})

const SubApp = () => {
  const { data = {} } = useSubscribe(SUB, {
    initialQuery: {
      query: GET_NOTICE,
    },
  })
  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const QueryApp = () => {
  const [data, setData] = useState()
  useEffect(() => {
    async function queryData() {
      // const res = await query(GET_USER)
      const res = await query(GET_PROJECT, {
        variables: { slug: 'foo' },
      })

      setData(res)
    }
    queryData()
  }, [])

  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

const UseQueryApp = () => {
  const { loading, data, error, refetch } = useQuery(GET_PROJECT, { variables: { slug: 'foo' } })

  console.log('loading:', loading)
  console.log('data:', data)

  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div className="App">
      <button onClick={() => refetch()}>refetch</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

// setTimeout(() => {
//   store.setId()
// }, 2000)

interface Project {
  name: string
  age: string
}

const UseQueryById = () => {
  // const { data: user } = useQuery(GET_USER, {
  //   variables: { login: 'forsigner' },
  // })

  const { loading, data, error, refetch } = useQuery<Project>(GET_PROJECT, {
    // name: 'getUserById',
    data: {} as Project,
    variables: { slug: 'forsigner' },
    deps: [],
    onUpdate({ data }) {
      // console.log('---------:', data)
    },
  })

  // console.log('loading:', loading)
  console.log('render---------data:', data)
  // console.log('render....')
  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  console.log('---', Storage.get(GET_PROJECT))

  return (
    <div className="App">
      <button onClick={() => refetch({ variables: { slug: 'bar' } })}>refetch</button>
      <button onClick={() => fetcher.get(GET_PROJECT).refetch({ variables: { slug: 'hui' } })}>
        refetch with fetcher
      </button>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}

const UseMutateApp = () => {
  const [addTodo, { loading, data, error }] = useMutate(GET_USER)

  return (
    <div className="App">
      <button onClick={() => addTodo({})}>
        {loading === undefined && 'Add Todo'}
        {loading !== undefined && (loading ? 'loading...' : ' Added')}
      </button>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default () => (
  <div>
    {/* <SubApp></SubApp> */}
    {/* <QueryApp /> */}
    <UseQueryById />
    {/* <UseQueryApp /> */}
    {/* <UseMutateApp /> */}
  </div>
)
