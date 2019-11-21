import * as React from 'react'
import JSONTree from 'react-json-tree'
// import { Storage } from './src'
import { Storage } from 'stook'
import styled from 'styled-components'

const Wrapper = styled.div``

const Body = styled.div`
  z-index: 10001;
  position: fixed;
  padding-left: 10px;
  top: 0;
  width: 300px;
  right: 0;
  height: 100%;
  overflow: auto;
  background: #fff;
  box-shadow: -2px 2px 8px #f0f0f0;
`

const Btn = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  box-shadow: 0px 2px 8px #f0f0f0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  font-weight: bolder;
  text-align: center;
  color: #aaa;
  cursor: pointer;
`

interface Stores {
  [key: string]: any
}
const DevTool = () => {
  function getJson() {
    const stores: Stores = Storage.stores

    return Object.keys(stores).reduce((result, cur: any) => {
      result[cur] = stores[cur].state
      return result
    }, {} as Stores)
  }
  const [state, setState] = React.useState(getJson())
  const [display, setDisplay] = React.useState('block')

  React.useEffect(() => {
    setInterval(() => {
      setState(getJson())
    }, 300)
  }, [])

  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  }

  return (
    <Wrapper>
      <Btn onClick={() => setDisplay('block')}>开</Btn>
      <Body style={{ display }}>
        <Btn onClick={() => setDisplay('none')}>关</Btn>
        <JSONTree theme={theme} data={state} />
      </Body>
    </Wrapper>
  )
}

export default DevTool
