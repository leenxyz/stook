import React from 'react'
import { useForm } from '@peajs/form'
import { Button, Input } from 'antd'

class User {
  username = 'foo'
  password = ''
}

export default () => {
  const { handlers, state, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <Input {...name('username')} />
      <Input {...name('password')} />
      <Button htmlType="submit" disabled={!state.valid}>
        submit
      </Button>
    </form>
  )
}
