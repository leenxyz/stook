import 'reflect-metadata'
import React from 'react'
import { useForm } from '@peajs/form'

class User {
  friends: string[] = ['Rose', 'curry']
}

export default () => {
  const {
    handlers,
    name,
    state: { values },
    actions,
  } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  function add() {
    actions.setValues(values => {
      values.friends = [...values.friends, '']
    })
  }

  function remove(index: number) {
    actions.setValues(values => {
      values.friends.splice(index, 1)
    })
  }

  return (
    <form onSubmit={handlers.handleSubmit}>
      {values.friends.map((item, index) => (
        <div key={index}>
          <input {...name(`friends[${index}]`)} />

          <button type="button" onClick={() => remove(index)}>
            -
          </button>
        </div>
      ))}

      <button type="button" onClick={add}>
        +
      </button>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
