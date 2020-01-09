import * as React from 'react'
import { original } from 'immer'
import { useStore, mutate } from './src'

interface User {
  id: number
  name: string
}

const user = { id: 1, name: 'foo' }

mutate('[User]', user)

export const Profile = () => {
  const [user, updateUser] = useStore<User>('[User]')
  return (
    <div>
      <span>{user.name}</span>
      <button
        onClick={() => {
          updateUser(user => {
            console.log('user:', user)
            console.log('original user:', original(user))
            user.name = 'forsigner'
          })
        }}
      >
        update user
      </button>
    </div>
  )
}
