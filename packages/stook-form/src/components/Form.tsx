import React, { FC, createContext } from 'react'
import { Result } from '../types'

interface FormProps {
  use: Result
}

export const FormContext = createContext({} as Result)

export const Form: FC<FormProps> = ({ children, use, ...rest }) => {
  const { Provider } = FormContext
  return (
    <Provider value={use}>
      <form onSubmit={use.handlers.handleSubmit} {...rest}>
        {children}
      </form>
    </Provider>
  )
}
