import React from 'react'
import { useForm } from '@peajs/form'

class User {
  drone = 'dewey'
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
        <input id="huey" {...name('drone', { type: 'radio', value: 'huey' })} />
        <label htmlFor="huey">Huey</label>
      </span>
      <span>
        <input id="dewey" {...name('drone', { type: 'radio', value: 'dewey' })} />
        <label htmlFor="dewey">Dewey</label>
      </span>
      <span>
        <input id="louie" {...name('drone', { type: 'radio', value: 'louie' })} />
        <label htmlFor="louie">Louie</label>
      </span>

      <button type="submit">Submit</button>
    </form>
  )
}
