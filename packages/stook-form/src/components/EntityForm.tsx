import React, { FC, memo } from 'react'
import { Button } from 'antd'
import { StookForm } from '../StookForm'
import get from 'lodash.get'
import { getFieldMetadata } from '../utils/getFieldMetadata'
import { Result } from '../types'

interface Props {
  result?: any
}

interface FieldProps {
  name: any
  item: any
  result: Result
  values: any
}

const Field: FC<FieldProps> = memo(
  props => {
    const { item, result, values } = props
    const { handleBlur, handleChange } = result.handlers
    if (item.component) {
      if (typeof item.component === 'string') {
        const Cmp = StookForm.componetStore[item.component]
        return (
          <Cmp
            name={item.name}
            value={get(values, item.name)}
            onChange={handleChange}
            onBlur={handleBlur}
            result={result}
            {...item}
          />
        )
      }
      const Cmp = item.component
      return <Cmp result={result}></Cmp>
    }
    return (
      <input
        name={item.name}
        value={get(values, item.name)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  },
  (prev, next) => {
    if (get(prev.values, prev.name) === get(next.values, next.name)) {
      return true
    }
    return false
  },
)

function getFieldsTpl(data: any, result: Result): any {
  const { state } = result
  return Object.keys(data).map(key => {
    const item = data[key]
    if (typeof item.isRef === 'boolean' && !item.isRefh) {
      const visible = get(state.visibles, item.name)
      if (!visible) return null
      return (
        <Field
          key={item.name}
          name={item.name}
          item={item}
          result={result}
          values={state.values}
        ></Field>
      )
    }

    return getFieldsTpl(item, result)
  })
}

export const EntityForm: FC<Props> = ({ result }) => {
  const { handlers } = result
  const { handleSubmit } = handlers
  const data = getFieldMetadata(result.instance)
  const tpl = getFieldsTpl(data, result)

  return (
    <form onSubmit={handleSubmit}>
      {tpl}
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </form>
  )
}
