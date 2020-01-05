import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { devtools } from 'stook-devtools'
import ShareState from './ShareState'
import CustomHooks from './CustomHooks'
// import Dependent from './Dependent'
import UseUpdate from './UseUpdate'
import UseUpdate2 from './UseUpdate2'
import Deps from './Deps'

devtools.init()

const Index = () => {
  return (
    <div>
      {/* <ShareState></ShareState> */}
      {/* <UseUpdate></UseUpdate> */}
      {/* <UseUpdate2></UseUpdate2> */}
      {/* <CustomHooks></CustomHooks> */}
      {/* <Dependent></Dependent> */}
      <Deps></Deps>
    </div>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
