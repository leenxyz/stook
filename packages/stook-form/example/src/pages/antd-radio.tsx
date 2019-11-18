import React from 'react'
import { Radio, Button } from 'antd'
import { useForm } from '@peajs/form'

class User {
  removed = false
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <Radio.Group {...name('removed')}>
        <Radio value={true}>应该</Radio>
        <Radio value={false}>不应该</Radio>
      </Radio.Group>

      <Button htmlType="submit">Submit</Button>
    </form>
  )
}
