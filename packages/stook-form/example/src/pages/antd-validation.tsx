import React from 'react'
import { useForm, PeaForm } from '@peajs/form'
import { Button, Input, Form, Select, Radio } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import { User } from '../User'

const { Option } = Select

PeaForm.register('help', ({ name, state }) => {
  const itemProps = {} as FormItemProps
  const error = state.errors[name]

  if (error && state.touched[name]) {
    itemProps.validateStatus = 'error'
    itemProps.help = error
  }

  if (!error && state.touched[name]) {
    itemProps.validateStatus = 'success'
    itemProps.hasFeedback = true
  }
  return itemProps
})

export default () => {
  const { state, handlers, handlerBuilder, name, help } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <Form.Item {...help('email')} label="E-mail">
        <Input type="text" {...name('email')} />
      </Form.Item>

      <Form.Item {...help('password')} label="Password">
        <Input {...name('password')} />
      </Form.Item>

      <Form.Item {...help('email')} label="Confirm Password">
        <Input {...name('email')} />
      </Form.Item>

      <Form.Item {...help('email')} label="Confirm Password">
        <Input {...name('email')} />
      </Form.Item>

      <Form.Item {...help('nickname')} label="Nickname">
        <Input {...name('nickname')} />
      </Form.Item>

      <Form.Item {...help('phone')}>
        <Select
          value={state.values.phone}
          onChange={handlerBuilder.createChangeHandler('phone')}
          style={{ width: 200 }}
        >
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
      </Form.Item>

      <Form.Item {...help('removed')}>
        <Radio.Group {...name('removed')}>
          <Radio value={true}>应该</Radio>
          <Radio value={false}>不应该</Radio>
        </Radio.Group>
      </Form.Item>
      <Button htmlType="submit" disabled={!state.valid}>
        submit
      </Button>
    </form>
  )
}
