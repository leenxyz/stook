import React, { FC, memo } from 'react'
import { Button } from 'antd'
import { Tools } from '../Tools'
import get from 'lodash.get'
import { getFieldMetadata } from '../utils/getFieldMetadata'
import { Result, EntityType } from '../types'
import { useForm } from '../useForm'

interface EntityFormProps {
  result?: Result
  entity?: EntityType
}

interface FieldProps {
  name: any
  item: any
  result: Result
  values: any
}

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

const Field: FC<FieldProps> = memo(
  props => {
    const { item, result, values } = props
    const { handleBlur, handleChange } = result.handlers
    if (item.component) {
      if (typeof item.component === 'string') {
        const Cmp = Tools.componetStore[item.component]
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

const BaseEntity: FC<{ entity: EntityType }> = ({ entity }) => {
  const result = useForm(entity)
  return <BaseResult result={result}></BaseResult>
}

const BaseResult: FC<{ result: Result }> = ({ result }) => {
  const { handlers } = result
  const { handleSubmit } = handlers
  const data = getFieldMetadata(result.instance)
  const tpl = getFieldsTpl(data, result)

  // use custom form
  const Form = Tools.formComponent
  if (Form) {
    return (
      <Form onSubmit={handleSubmit}>
        {tpl}
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {tpl}
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </form>
  )
}

export const EntityForm: FC<EntityFormProps> = ({ result, entity }) => {
  if (result) return <BaseResult result={result}></BaseResult>
  if (entity) return <BaseEntity entity={entity}></BaseEntity>
  throw new Error('result or entity needed')
}
