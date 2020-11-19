// 通过Context传递store
import React from 'react'


const useForceUpdate = ()=>{
  const [state,setState] = React.useState(0)
  const update = React.useCallback(()=>{
    setState(pre=>pre+1)
  })
  return update
}

const Context = React.createContext()

const useStore = ()=>React.useContext(Context)

export const useSelector = (cb)=>{
  const store = useStore()
  const forceUpdate = useForceUpdate()

  React.useLayoutEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      forceUpdate()
    })
    return ()=>{
      unsubscribe&&unsubscribe()
    }
  },[store])

  return cb(store.getState())
}

export const useDispatch = ()=>useStore().dispatch

export function Provider({store,children}) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

const dispatchHandler = (mapDispatchToProps,dispatch)=>{
  if(mapDispatchToProps instanceof Function){
    return mapDispatchToProps(dispatch)
  }else if(mapDispatchToProps instanceof Object){
    return bindActionCreators(mapDispatchToProps,dispatch)
  }else {
    return {dispatch}
  }
}

export const connect = (mapStateToProps,mapDispatchToProps)=>WrappedComponent=>props=>{
  const store = React.useContext(Context)
  const realProps = {
    ...props,
    ...mapStateToProps(store.getState()),
    ...dispatchHandler(mapDispatchToProps,store.dispatch)
  }
  // const [,forceUpdate] = React.useReducer(x=>x+1,0)
  const forceUpdate = useForceUpdate()

  // * useEffect 在组件初次渲染到页面之后 延迟执行 （假如在延迟期间store的state发生了改变 那么就会错过组件更新）
  // * useLayoutEffect 在组件初次渲染到页面之后 立即执行

  React.useLayoutEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      forceUpdate()
    })
    return ()=>{
      unsubscribe&&unsubscribe()
    }
  },[store])

  return <WrappedComponent {...realProps} />
}

export function bindActionCreators(creators,dispatch) {
  let obj = {}

  obj = Object.entries(creators).reduce((state,[key,actionCreator])=>({
    ...state,
    [key]:(...args)=>dispatch(actionCreator(...args))
  }),obj)

  return obj
}
