import React from 'react'
import { useForm } from '@peajs/form'
import { IsNotEmpty, Validate, ValidatorConstraint } from 'class-validator'

@ValidatorConstraint()
export class PasswordConfirm {
  validate(confirm: string, args: any) {
    return confirm === args.object.password
  }
}

class User {
  @IsNotEmpty({ message: 'require password' })
  password = ''

  @Validate(PasswordConfirm, {
    message: 'Password confirm',
  })
  confirm = ''
}

export default () => {
  const { handlers, name, error } = useForm(User, {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <form onSubmit={handlers.handleSubmit}>
      <input placeholder="Password" {...name('password')} />
      <div className="field-error">{error('password')}</div>
      <input placeholder="Password confirm" {...name('confirm')} />
      <div className="field-error">{error('confirm')}</div>
      <button type="submit">Submit</button>
    </form>
  )
}
