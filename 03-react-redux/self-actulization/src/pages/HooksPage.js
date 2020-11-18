import React from 'react'
import { countReducer } from '../store'

function HooksPage() {

  const initArg = init => init-0
  const [state,dispatch] = React.useReducer(countReducer,"1",initArg)

  return (
    <div>
      HooksPage
      <p>count:{state}</p>
      <button onClick={()=>dispatch({type:'ADD'})}>Add</button>
      <button onClick={()=>dispatch({type:'MINUS'})}>MINUS</button>
    </div>
  )
}

export default HooksPage
