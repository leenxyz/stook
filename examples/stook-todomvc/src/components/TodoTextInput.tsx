import * as React from 'react'
import classnames from 'classnames'

interface Props {
  onSave: (text: string) => void
  text?: string
  placeholder?: string
  editing?: boolean
  newTodo?: any | boolean
}

export default class TodoTextInput extends React.Component<Props> {
  state = {
    text: this.props.text || '',
  }

  handleSubmit = (e: any | React.FormEvent<HTMLInputElement>): void => {
    const text = e.currentTarget.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value })
  }

  handleBlur = (e: React.FormEvent<HTMLInputElement>): void => {
    if (!this.props.newTodo) {
      this.props.onSave(e.currentTarget.value)
    }
  }

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo,
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
