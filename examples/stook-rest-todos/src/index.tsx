import * as React from 'react'
import { render } from 'react-dom'
import { config } from 'stook-rest'
import App from './components/App'
import { devtools } from 'stook-devtools'


devtools.init()

config({
  baseURL: "https://jsonplaceholder.typicode.com"
});

render(<App />, document.getElementById('root'))
