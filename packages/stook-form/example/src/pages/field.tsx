import React from 'react'
import { useForm, Form, Item } from '@peajs/form-antd'

import { IsNotEmpty } from 'class-validator'
class User {
  @IsNotEmpty()
  username = ''

  @IsNotEmpty()
  password = 10
}

export default () => {
  const result = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Form use={result}>
      <pre>{JSON.stringify(result.state, null, 2)}</pre>

      <Item label="Username" name="username" />
      <Item label="password" name="password" type="InputNumber" />

      <button type="submit">Submit</button>
      <div></div>
      <button
        type="button"
        onClick={() => {
          result.actions.setVisible(visible => {
            visible.password = false
          })
        }}
      >
        hide username
      </button>
    </Form>
  )
}
