import React from 'react'
import { Input, InputNumber } from 'antd'
import { IsNotEmpty } from 'class-validator'
import { useForm, Form, Item, Field } from '@peajs/form-antd'


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
      <Field name="username">
        <Input />
      </Field>
      <Item label="Username" name="username" required>
        <Input />
      </Item>
      <Item label="password" name="password">
        <InputNumber />
      </Item>
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
