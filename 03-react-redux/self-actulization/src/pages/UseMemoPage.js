import React from 'react'

export default function UseMemoPage() {
  const [value,setValue] = React.useState(1)
  const [count,setCount] = React.useState(1)

  // const total = ()=>{
  //   console.log('computed');
  //   return new Array(count).fill(1).reduce((a,b,i)=>a+i+1,0)
  // }
  
  const total = React.useMemo(()=>{
      console.log('computed');
      return new Array(count).fill(1).reduce((a,b,i)=>a+i+1,0)
    },[count])

  return (
    <div>
      <p>total{total}</p>
      <p>count{count}</p>
      <p>value{value}</p>
      <button onClick={()=>setCount(count+1)}>add</button>
      <input type="text" value={value} onChange={e=>setValue(e.target.value)}/>
    </div>
  )
}
