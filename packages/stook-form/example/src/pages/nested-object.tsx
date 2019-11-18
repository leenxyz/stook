import React from 'react'
import { useForm } from '@peajs/form'

class Profile {
  name: string
  intro: string
}

class User {
  profile: Profile = {
    name: 'James',
    intro: 'hey guys',
  }
}

export default () => {
  const { handlers, name } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('profile.name')} />
      <input {...name('profile.intro')} />
      <button type="submit">Submit</button>
    </form>
  )
}
