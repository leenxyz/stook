import 'reflect-metadata'
import React from 'react'
import { useForm } from '@peajs/form'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class User {
  username = ''
  password = ''
}

export default () => {
  const { handlers, name, state } = useForm(User, {
    async onSubmit(values, { actions }) {
      await sleep(2000)
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input placeholder="username" {...name('username')} />
      <input placeholder="password" {...name('password')} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  )
}
