import 'reflect-metadata'
import React from 'react'
import { useForm } from 'stook-form'
import { useStore } from 'stook'

// import { devtools } from 'stook-devtools'

// devtools.init()

class User {
  username = 'Jack'
  password = ''
}

export default () => {
  const { handlers, name, actions, state } = useForm(User, {
    // name: 'my_form',
    initValues(values) {
      console.log('init.........')
      return {
        ...values,
        username: 'new name',
        password: '1111',
      }
    },
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const [formState] = useStore('my_form')

  console.log('formState:', formState)

  return (
    <form onSubmit={handlers.handleSubmit}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <input placeholder="username" {...name('username')} />
      <input placeholder="password" {...name('password')} />
      <button type="submit">Submit</button>
      <button type="button" onClick={actions.resetForm}>
        Reset
      </button>
    </form>
  )
}
