import React, { FC } from 'react'
import { IsNotEmpty } from 'class-validator'
import { Entity } from '../../../src/decorators/Entity'
import { Field } from '../../../src/decorators/Field'
import { EntityForm, useForm } from '../../../src'
import { StookForm } from '../../../src'

const PasswordInput: FC<any> = props => {
  return (
    <div>
      密码： <input value={props.value} name={props.name} onChange={props.onChange} />
    </div>
  )
}

StookForm.registerComponent('PasswordInput', PasswordInput)

@Entity('profile')
class Profile {
  @Field({ defaultValue: 'forsigner', component: 'PasswordInput', label: '名字' })
  name: string

  @Field({ defaultValue: '码农一个', component: 'PasswordInput', label: '简介' })
  intro: string
}

@Entity('user')
export class User {
  @Field({ defaultValue: 'jobs', label: '用户名' })
  @IsNotEmpty()
  username = 'jobhaha'

  @Field({ defaultValue: '123456', component: 'PasswordInput', label: '密码' })
  @IsNotEmpty()
  password = 10

  @Field({ defaultValue: 100, label: '年龄' })
  @IsNotEmpty()
  age = 10

  @Field(() => Profile)
  @IsNotEmpty()
  profile: Profile

  // @Field(() => [Profile])
  // @IsNotEmpty()
  // user: Profile[]

  onSubmit(values: User) {
    console.log('-------submit....')
    alert(JSON.stringify(values, null, 2))
  }

  onError(errors: any) {
    console.log('errors:', errors)
  }
}

export default () => {
  const result = useForm(User)
  return <EntityForm result={result}></EntityForm>
}
