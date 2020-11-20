import React from 'react'
import { RouterContext } from './RouterContext'

export default React.forwardRef(({to,children,...restProps},ref)=> {

  const context = React.useContext(RouterContext)

  const handleClick = (e)=>{
    e.preventDefault()
    context.history.push(to)
  }

  return (
  <a href={to} {...restProps} onClick={handleClick} ref={ref}>{children}</a>
  )
})
