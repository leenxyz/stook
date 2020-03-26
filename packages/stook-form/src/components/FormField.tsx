import React, { FC, useContext, memo } from 'react'
import get from 'lodash.get'
import { FormContext } from './Form'
import { StookForm } from '../StookForm'
import { Result } from '../types'
import { getFieldMetadata } from 'src/utils/getFieldMetadata'

interface Props {
  name: string
}

interface ItemProps {
  name: string
  item: any
  result: Result
  values: any
}

const Item: FC<ItemProps> = memo(
  props => {
    const { item, result, name } = props
    const { values } = result.state
    const { handleChange, handleBlur } = result.handlers
    const Cmp = StookForm.componetStore[item.component]
    return (
      <Cmp
        {...item}
        value={get(values, name)}
        onChange={handleChange}
        handleBlur={handleBlur}
        result={result}
        name={name}
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

export const FormField: FC<Props> = ({ name }) => {
  const result = useContext(FormContext)
  const { state } = result
  const visible = get(state.visibles, name)

  if (visible === false) return null

  // TODO: 多次调用, 可能有性能问题
  const data = getFieldMetadata(result.instance)
  const item = get(data, name)

  if (!item) {
    throw new Error(`${name} is not exist in entity`)
  }

  if (!item.component) {
    return <input placeholder={item.name} {...result.name(item.name)} />
  }

  if (typeof item.component === 'string') {
    return <Item name={name} item={item} values={state.values} result={result}></Item>
  }
  const Cmp = item.component
  return <Cmp result={result} {...result.name(name)}></Cmp>
}
