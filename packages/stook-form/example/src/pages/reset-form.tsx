import 'reflect-metadata'
import React from 'react'
import { useForm } from '@peajs/form'


class User {
  username = ''
  password = ''
}

export default () => {
  const { handlers, name, actions } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input placeholder="username" {...name('username')} />
      <input placeholder="password" {...name('password')} />
      <button type="submit">Submit</button>
      <button type="button" onClick={actions.resetForm}>Reset</button>
    </form>
  )
}
