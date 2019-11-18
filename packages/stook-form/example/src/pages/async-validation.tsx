import React from 'react'
import { useForm } from '@peajs/form'
import { IsNotEmpty, Validate, ValidatorConstraint } from 'class-validator'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

@ValidatorConstraint()
export class CustomTextLength {
  async validate(text: string) {
    await sleep(2000)
    return text.length > 5 && text.length < 10
  }
}

class User {
  @IsNotEmpty({ message: 'require username' })
  username = 'foo'

  @Validate(CustomTextLength, {
    message: 'Wrong post title',
  })
  password = ''
}

export default () => {
  const { handlers, name, error } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input {...name('username')} />
      <div className="field-error">{error('username')}</div>
      <input {...name('password')} />
      <div className="field-error">{error('password')}</div>
      <button type="submit">Submit</button>
    </form>
  )
}
