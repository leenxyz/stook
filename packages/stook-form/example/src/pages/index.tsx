import 'reflect-metadata'
import React from 'react'
import { entity, field, EntityForm } from '../src'

@entity('user-entity')
export class User {
  @field({ defaultValue: 'jobs' })
  username: string

  @field({ defaultValue: '' })
  password: string

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }
}

export default () => {
  return <EntityForm entity={User}></EntityForm>
}
