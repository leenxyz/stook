import * as React from 'react'
import classnames from 'classnames'
import { useVisibilityFilter } from '../hooks/visibilityFilter.hooks'

interface LinkProp {
  filter: string
  active?: boolean
  children: React.ReactNode
}

const Link: React.SFC<LinkProp> = ({ children, filter }) => {
  const { visibilityFilter, setVisibilityFilter } = useVisibilityFilter()

  return (
    <React.Fragment>
      <a
        className={classnames({ selected: filter === visibilityFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => setVisibilityFilter(filter)}
      >
        {children}
      </a>
    </React.Fragment>
  )
}

export default Link
