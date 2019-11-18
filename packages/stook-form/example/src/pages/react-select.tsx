import React from 'react'
import { useForm } from '@peajs/form'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

class Model {
  items1: any = options[1]
  items2: any = [options[0], options[1]]
}

export default () => {
  const { state, handlers, handlerBuilder } = useForm(Model, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <Select
          value={state.values.items1}
          options={options}
          onChange={handlerBuilder.createChangeHandler('items1')}
        />
      </div>
      <div>
        <Select
          value={state.values.items2}
          options={options}
          isMulti
          onChange={handlerBuilder.createChangeHandler('items2')}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
