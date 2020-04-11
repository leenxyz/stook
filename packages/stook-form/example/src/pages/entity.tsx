import React, { FC } from 'react'
import { Input, Form } from 'antd'
import { IsNotEmpty } from 'class-validator'
import { entity } from '../src'
import { field } from '../src'
import { EntityForm, useForm } from '../src'
import { Tools } from '../src'

const PasswordInput: FC<any> = props => {
  return (
    <div>
      密码： <input value={props.value} name={props.name} onChange={props.onChange} />
    </div>
  )
}

Tools.registerField('PasswordInput', PasswordInput)
Tools.registerField('Input', Input)
Tools.registerForm(Form)

@entity('profile')
class Profile {
  @field({ defaultValue: 'forsigner', component: 'PasswordInput', label: '名字' })
  name: string

  @field({ defaultValue: '码农一个', component: 'PasswordInput', label: '简介' })
  intro: string
}

@entity('user')
export class User {
  @field({ defaultValue: 'jobs', label: '用户名', component: 'Input' })
  @IsNotEmpty()
  username = 'jobhaha'

  @field({ defaultValue: '123456', component: 'PasswordInput', label: '密码' })
  @IsNotEmpty()
  password = 10

  @field({ defaultValue: 100, label: '年龄' })
  @IsNotEmpty()
  age = 10

  @field(() => Profile)
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
