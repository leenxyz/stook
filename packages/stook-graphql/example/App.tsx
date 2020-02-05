import React, { useState, useEffect } from 'react'
import gql from 'gql-tag'

import {
  config,
  query,
  useQuery,
  useMutate,
  fetcher,
  useSubscribe,
  fromSubscription,
  applyMiddleware,
  Client,
} from './src'

applyMiddleware(async (ctx, next) => {
  ctx.headers.Authorization = `bearer token...`
  await next()
  if (typeof ctx.body !== 'object') return
  if (Object.keys(ctx.body).length === 1) {
    ctx.body = ctx.body[Object.keys(ctx.body)[0]]
  }
})

export const GET_USER = gql`
  {
    userMany {
      _id
      name
    }
  }
`

config({
  // endpoint: 'http://localhost:7001/graphql',
  endpoint: 'https://graphql-compose.herokuapp.com/user',
  // endpoint: 'http://localhost:5001/graphql',
  // subscriptionsEndpoint: 'ws://localhost:5001/graphql',
})

const client = new Client({
  endpoint: 'http://localhost:5001/graphql',
  subscriptionsEndpoint: 'ws://localhost:5001/graphql',
})

export const GET_PROJECT = gql`
  query plot($scriptId: Int) {
    plots(scriptId: $scriptId) {
      scriptId
      id
      title
    }
  }
  # query getProject($slug: String!) {
  #   project(slug: $slug) {
  #     _id
  #     name
  #   }
  # }
  # {
  #   message {
  #     content
  #     id
  #   }
  # }

  # {
  #   users {
  #     name
  #     age
  #   }
  #   user(name: "Rose") {
  #     name
  #   }
  # }
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
  subscription msg {
    messageSubscription {
      id
      content
    }
  }
`

const GET_NOTICE = gql`
  {
    message {
      content
      id
    }
  }
`

const SubApp = () => {
  const { data = {} } = client.useSubscribe(SUB, {
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
  const { loading, data, error, refetch } = useQuery(GET_USER, {
    pollInterval: 3000,
    variables: { slug: 'foo' },
  })

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

  const { data: script, loading: loading1 } = client.useQuery(`
    {
      script(id: 32){
        id
        limitNum
        title
      }
    }
  `)

  const { loading, data, error, refetch } = client.useQuery<Project>(GET_PROJECT, {
    // name: 'getUserById',
    variables: () => {
      return { scriptId: script.script.id }
    },
  })

  console.log('render---------data:', loading1, loading, script, data)
  if (loading) return <div>loading....</div>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

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
  console.log('loading:', loading)

  return (
    <div className="App">
      <button onClick={() => addTodo({})}>
        {!loading && 'Add Todo'}
        {loading && 'loading...'}
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
    {/* <UseQueryById /> */}
    <UseQueryApp />
    {/* <UseMutateApp /> */}
  </div>
)

// fromSubscription(SUB).subscribe({
//   next(data) {
//     console.log('data---------:', data)
//   },
// })
