import React, { FC } from 'react'
import { IsNotEmpty } from 'class-validator'
import { Entity } from '../src/decorators/Entity'
import { Field } from '../src/decorators/Field'
import { Form, useForm, FormField } from '../src'
import { StookForm } from '../src'

const PasswordInput: FC<any> = props => {
  return (
    <div>
      {props.label}： <input value={props.value} name={props.name} onChange={props.onChange} />
    </div>
  )
}

StookForm.registerComponent('PasswordInput', PasswordInput)

@Entity('profile')
class Profile {
  @Field({ defaultValue: 'forsigner', component: 'PasswordInput', label: '名字' })
  name: string

  @Field({ defaultValue: '码农一个', component: 'PasswordInput', label: '介绍' })
  intro: string
}

@Entity('user')
export class User {
  @Field({ defaultValue: 'jobs' })
  @IsNotEmpty()
  username = 'jobhaha'

  @Field({ defaultValue: '123456', component: 'PasswordInput' })
  @IsNotEmpty()
  password = 10

  @Field({ defaultValue: 100 })
  @IsNotEmpty()
  age = 10

  @Field(() => Profile)
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
    <Form use={result}>
      <FormField name="password"></FormField>
      <FormField name="age"></FormField>
      <FormField name="profile.name"></FormField>
      <FormField name="profile.intro"></FormField>
    </Form>
  )
}
