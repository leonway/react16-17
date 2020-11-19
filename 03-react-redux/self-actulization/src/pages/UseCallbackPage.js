import React from 'react'

export default function UseMemoPage() {
  const [value,setValue] = React.useState(1)
  const [count,setCount] = React.useState(1)

  const add = React.useCallback(()=>{
    setCount(count+1)
  },[count])

  // const add = ()=>{
  //   setCount(count+1)
  // }

  return (
    <div>
      <p>count{count}</p>
      <p>value{value}</p>
      <button onClick={()=>setCount(count+1)}>add</button>
      <input type="text" value={value} onChange={e=>setValue(e.target.value)}/>
      <Child onClick={add} />
    </div>
  )
}

const Child = React.memo(()=>{
  console.log('Child render');
  return <div>child</div>
})
