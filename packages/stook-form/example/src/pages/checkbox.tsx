import React from 'react'
import { useForm } from '@peajs/form'

class User {
  checks = ['horns']
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <span>
        <input id="scales" {...name('checks', { type: 'checkbox', value: 'scales' })} />
        <label htmlFor="scales">Scales</label>
      </span>
      <span>
        <input id="horns" {...name('checks', { type: 'checkbox', value: 'horns' })} />
        <label htmlFor="horns">Horns</label>
      </span>

      <button type="submit">Submit</button>
    </form>
  )
}
