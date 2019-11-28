import * as React from 'react'

import { useStore, getState } from 'stook'

function handleSubmit() {
  const name = getState('[UserForm]')
  alert(name)
}

export const Form = () => {
  const [name, setName] = useStore('[UserForm]', 'iniial name')
  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
