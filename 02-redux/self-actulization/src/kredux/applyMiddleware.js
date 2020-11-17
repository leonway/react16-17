const compose = (...funcs)=>{
  if(!funcs.length){
    return fn=>fn
  }
  if(funcs.length===1){
    return funcs[0]
  }
  return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
}

export default function applyMiddleware(...middleWares) {
  return (createStore)=>(reducer)=>{
    
    const store = createStore(reducer)

    let dispatch = store.dispatch;

    // todo 加强store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch:action=>{
        console.log('=====dispatch1======');
        console.log(dispatch);
        console.log('=====action1======');
        console.log(action);
        return dispatch(action)
      }
    }

    const middleWareChain = middleWares.map(middleWare=>middleWare(midApi))

    const composeFunc = compose(...middleWareChain)
    console.log('------composeFunc--------');
    console.log(composeFunc);
    dispatch = composeFunc(dispatch)
    console.log('------realDispatch--------');
    console.log(dispatch);
    //加强store.dispatch
    return {
      ...store,
      dispatch
    }
  }
} 
