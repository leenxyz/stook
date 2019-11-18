import React from 'react'
import { useForm } from '@peajs/form'

class User {
  selected = 'audi'
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <select {...name('selected')}>
        <option value="">任意</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  )
}
