import React from 'react'
import { useHistory } from './hooks'

export default function Prompt(props) {
  const { when,message } = props
  const history = useHistory()
  let unListener

  React.useLayoutEffect(()=>{
    if(when){
      if(unListener){
        unListener()
        unListener=null
      }
      console.log("=============");
      console.log(history);

      unListener = history.block(({location,retry} )=> {
        let tips;
        if(typeof message==='string'){
          tips=message
        }else{
          const res = message(location)
          if(res===true){
            unListener&&unListener()
            unListener = null
            retry()
            return 
          }else{
            tips=res
          }
        }
      if (window.confirm(tips)) {
        unListener&&unListener()
        unListener = null
        retry()
      }
    })
    }
    return ()=>{
      unListener&&unListener()
    }
  },[when,message,history])

  return null
}
