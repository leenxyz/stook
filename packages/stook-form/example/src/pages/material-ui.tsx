import React from 'react'
import { useForm } from '@peajs/form'
import { TextField } from '@material-ui/core'

class User {
  username = 'foo'
  password = ''
}

export default function App() {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <div>
        <TextField label="username" {...name('username')} />
      </div>
      <div>
        <TextField label="password" {...name('password')} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
