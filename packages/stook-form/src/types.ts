import React from 'react'
import { HandlerBuilder } from './builders/HandlerBuilder'

export type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type Errors<T = any> = {
  [K in keyof T]?: T[K] extends object ? Errors<T[K]> : string
}

export type Touched<T = any> = {
  [K in keyof T]?: T[K] extends object ? Touched<T[K]> : boolean
}

export type Visibles<T = any> = {
  [K in keyof T]?: T[K] extends object ? Visibles<T[K]> : boolean
}

export interface EntityType<T = any> {
  new (...args: any[]): T
}

export interface State<T = any> {
  values: T
  errors: Errors<T>
  touched: Touched<T>
  visibles: Visibles<T>
  submitting: boolean
  dirty: boolean
  valid: boolean
  submitCount: number
}

export interface Actions<T = any> {
  setTouched(fn: (touched: Touched<T>) => void): void
  setVisibles(fn: (visibles: Visibles<T>) => void): void
  setErrors(fn: (errors: Errors<T>) => void): void
  setValues(fn: (values: T) => void): void
  setSubmitting(isSubmitting: boolean): void
  resetForm(): void
  submitForm(): void
  setState(state: State<T>): void
}

export interface Handlers {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => Promise<any>
  handleBlur(e: React.FocusEvent<any>): Promise<any>
  handleBlur<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : Promise<any>
  handleChange(e: React.ChangeEvent<any>): Promise<any>
  handleChange<T = unknown | React.ChangeEvent<any>>(
    field: T,
  ):
    | (T extends React.ChangeEvent<any> ? void : (e: unknown | React.ChangeEvent<any>) => void)
    | Promise<any>
}

export interface NameProps {
  name: string
  value?: any
  onChange: any
  onBlur?: any
  type?: string
  checked?: boolean
}

export interface NameOptions {
  value?: any
  type?: string
  onBlur?: boolean
}

export interface Result<T = any> {
  state: State<T>
  handlers: Handlers
  actions: Actions<T>
  handlerBuilder: HandlerBuilder<T>
  instance: T
  name(name: string, options?: NameOptions): any
  error(name: string): any
}

export interface Options<T = any> {
  name?: string
  initValues?: (instance: T) => T
  validate?: (values: T, { state, actions }: { state: State<T>; actions: Actions<T> }) => any
  onSubmit?: (values: T, { state, actions }: { state: State<T>; actions: Actions<T> }) => any
  onError?: (errors: Errors<T>, { state, actions }: { state: State<T>; actions: Actions<T> }) => any
  onReset?: ({ state, actions }: { state: State<T>; actions: Actions<T> }) => any
  setVisibles?: (state: State<T>) => any
}

export interface FieldValue {
  name: string
  isRef: boolean
  ref?: any
  label?: string
  defaultValue?: any
  visible?: boolean
  display?: boolean
  index?: number
  component?: any
}
