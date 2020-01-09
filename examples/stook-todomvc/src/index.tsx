import * as React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import 'todomvc-app-css/index.css'
import { devtools } from 'stook-devtools'

devtools.init()

render(<App />, document.getElementById('root'))
