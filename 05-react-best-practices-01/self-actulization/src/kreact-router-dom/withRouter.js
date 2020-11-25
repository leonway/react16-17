import React from 'react'
import { Consumer } from './RouterContext'
const withRouter = Component=>props=>{
  return <Consumer>
    {
      context=><Component {...props} {...context} />
    }
  </Consumer>
}
export default withRouter
