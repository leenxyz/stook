import React, { FC } from 'react'
import { IsNotEmpty } from 'class-validator'
import { entity } from '../src/decorators/entity'
import { field } from '../src/decorators/field'
import { FieldForm, useForm, Field } from '../src'
import { Tools } from '../src'

const Password: FC<any> = props => {
  return (
    <div>
      {props.label}： <input value={props.value} name={props.name} onChange={props.onChange} />
    </div>
  )
}

Tools.registerField('PasswordInput', Password)

@entity('profile')
class Profile {
  @field({ defaultValue: 'forsigner', component: 'PasswordInput', label: '名字' })
  name: string

  @field({ defaultValue: '码农一个', component: 'PasswordInput', label: '介绍' })
  intro: string
}

@entity('user')
export class User {
  @field({ defaultValue: 'jobs' })
  @IsNotEmpty()
  username = 'jobhaha'

  @field({ defaultValue: '123456', component: 'PasswordInput' })
  @IsNotEmpty()
  password = 10

  @field({ defaultValue: 100 })
  @IsNotEmpty()
  age = 10

  @field(() => Profile)
  @IsNotEmpty()
  profile: Profile

  onSubmit(values: User) {
    alert(JSON.stringify(values, null, 2))
  }

  onError(errors: any) {
    console.log('errors:', errors)
  }
}

export default () => {
  const result = useForm(User)
  return (
    <FieldForm use={result}>
      <Field name="password"></Field>
      <Field name="age"></Field>
      <Field name="profile.name"></Field>
      <Field name="profile.intro"></Field>
    </FieldForm>
  )
}
