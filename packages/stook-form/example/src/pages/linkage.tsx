import React from 'react'
import { Radio, Button, Input } from 'antd'
import { useForm } from '@peajs/form'

class User {
  gender: 'male' | 'female' = 'male'

  husbandName = ''

  wifeName = ''
}

export default () => {
  const { handlers, name, state } = useForm(User, {
    onSubmit(values) {
      console.log('values:', values)
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <Radio.Group {...name('gender')}>
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
      </Radio.Group>

      {state.values.gender === 'female' && (
        <Input placeholder="Husband name" {...name('husbandName')} />
      )}

      {state.values.gender === 'male' && <Input placeholder="Wife name" {...name('wifeName')} />}

      <Button htmlType="submit">Submit</Button>
    </form>
  )
}
