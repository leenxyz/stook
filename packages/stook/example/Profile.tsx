import * as React from 'react'

import { useStore, mutate } from '../src'

const user = { id: 1, name: 'foo' }

mutate('[User]', user)

export const Profile = () => {
  const [user, updateUser] = useStore('[User]')
  return (
    <div>
      <span>{user.name}</span>
      <button onClick={() => updateUser({ name: 'bar' })}>update user</button>
    </div>
  )
}
