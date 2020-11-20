import React from 'react'
import { useHistory } from './hooks'

const Redirect = (props)=>{
  const history = useHistory()
  const { to,push=false } = props
  return <LifeCycle 
    onMount={()=>{
      push?history.push(to):history.replace(to)
    }}
  />
}

const LifeCycle = (props)=>{
  React.useLayoutEffect(()=>{
    props.onMount&&props.onMount()
  },[])
  return null
}

export default Redirect


