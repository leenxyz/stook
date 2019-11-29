import * as React from 'react'

import { useStore, getState } from './src'

function handleSubmit() {
  const name = getState('[UserForm]')
  alert(name)
}

export const Form = () => {
  const [user, setUser] = useStore('[UserForm]', { name: 'iniial name' })
  return (
    <div>
      <input type="text" value={user.name} onChange={e => setUser({ name: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
