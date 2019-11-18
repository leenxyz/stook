import React, { FC, useState } from 'react'
import { Icon } from 'antd'
import { Link } from '@peajs/router'

import '../index.scss'

interface Item {
  type: string
  ui?: boolean
}
const routes: Item[] = [
  { type: '' },
  {
    type: 'nested-object',
  },
  {
    type: 'array',
  },
  {
    type: 'radio',
  },
  {
    type: 'checkbox',
  },
  {
    type: 'select',
  },
  {
    type: 'async-submit',
  },
  {
    type: 'reset-form',
  },
  {
    type: 'sync-validation',
  },
  {
    type: 'error-message',
  },
  {
    type: 'dynamic-array',
  },
  {
    type: 'custom-validator',
  },
  {
    type: 'async-validation',
  },
  {
    type: 'password-confirm',
  },
  {
    type: 'linkage',
  },
  {
    type: 'material-ui',
    ui: true,
  },
  {
    type: 'antd',
    ui: true,
  },
  {
    type: 'field',
    ui: true,
  },
  {
    type: 'item',
    ui: true,
  },
  {
    type: 'antd-validation',
    ui: true,
  },
  {
    type: 'antd-radio',
    ui: true,
  },
  {
    type: 'react-select',
    ui: true,
  },
]

const codeBaseUrl = 'https://github.com/pea-team/pea/blob/master/packages/form/example/src/pages/'

const App: FC = ({ children }) => {
  const [title, setTitle] = useState(location.pathname.replace('/', ''))
  const item = routes.find(i => i.type === title) as Item

  function clickItem(item: Item) {
    setTitle(item.type !== '' ? item.type : 'basic')
  }

  function getUrl() {
    let type: string
    if (!item) {
      type = 'index.tsx'
    } else {
      type = item.type + '.tsx'
    }
    return codeBaseUrl + type
  }

  function isUI() {
    return (item && item.ui) || false
  }

  return (
    <div>
      <div className="nav">
        {routes.map(item => (
          <span key={item.type} onClick={() => clickItem(item)}>
            <Link activeClassName="selected" to={`/${item.type}`}>
              {item.type !== '' ? item.type : 'basic'}
            </Link>
          </span>
        ))}
      </div>

      <div className={`card ${isUI() ? '' : 'no-ui'}`}>
        <h1 className="title">{title || 'basic'}</h1>
        <a className="source-code" href={getUrl()} target="_blank" rel="noopener noreferrer">
          <Icon type="code" />
          Source Code
        </a>
        {children}
      </div>
    </div>
  )
}

export default App
