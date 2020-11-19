import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../kreact-redux'
 
function ReactReduxHooksPage(props) {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  const add = React.useCallback(()=>dispatch({type:"ADD"}),[dispatch])
  console.log(count,dispatch);
  return (
    <div>
      <h3>{count}</h3>
      <button onClick={add}>Add</button>
    </div>
  )
}

export default ReactReduxHooksPage

