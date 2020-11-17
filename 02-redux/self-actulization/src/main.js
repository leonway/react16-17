import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { isFSA } from 'flux-standard-action'
// import App from './pages/DialogPage';


ReactDOM.render(<App />,document.getElementById('root'));

const array1 = [1,2,3,4];
const reducer = (a,b)=>{
  console.log('---------a,b---------');
  console.log(a,b);
  return a+b
}

// console.log(array1.reduce(reducer));

 //派发action 修改状态 通知订阅更新
 const dispatch = (action) => {
  if(!isFSA(action)){
    throw new Error(`action is not a flux-standard-action, please use customMiddleware`);
  }
  console.log('真正的dispatch 触发了');
  // currentState = reducer(currentState,action)
  // currentListeners.forEach(listener=>listener())
}

function f1(next) {
  console.log('f1',next);
  return (action)=>{
    console.log('f1 dispatch 触发了');
    if(action instanceof Function){

    }else{
      return next(action)
    }
  }
}

function f2(next) {
  console.log('f2',next);
  return action=>{
    console.log('f2 dispatch 触发了');
    if(action instanceof Promise){

    }else{
      return next(action)
    }
  }
}

function f3(next) {
  console.log('f3',next);
  return (action)=>{
    console.log('pre logger');
    const returnValue = next(action)
    console.log('after logger');
    return returnValue
  }
  // return new Promise((res)=>{
  //   setTimeout(() => {
  //     console.log('f3',arg);
  //     res(arg)  
  //   }, 1000);
  // })
  
}

// f1(f2(f3('omg')))


//反例 这个错误compose
// const compose = (...fns)=>(args)=>{
//   fns.reduce((a,b)=>b(a),args)
// }

// const compose = (...fns)=>fns.reduce((a,b)=>(...args)=>a(b(...args)))

const compose = (...fns)=>{
  if(!fns.length){
    return (...args)=>args
  }
  if(fns.length===1){
    return fns[0]
  }
  return fns.reduce((a,b)=>(arg)=>a(b(arg)))
}

// compose(f1,f2,f3)('omg')

// (next)=>()
// (arg)=>a(b(arg))

// (omg)=>a(b(omg))

// compose(f1,f2,f3)
const next0 = f1

// const next1 = (arg)=>next0(f2(arg))

// const next2 = (arg)=>next1(f3(arg))

const next3 = arg=>((arg)=>((arg)=>f1(f2(arg)))(f3(arg)))(arg)

// const superDispatch = next3(dispatch)

// setTimeout(() => {
//   superDispatch({type:'ADD'})
// }, 3000);
// const compose = (...fns)=>{
//   console.log('----compose----');
//   console.log(...fns);
//   const res = fns.reduce((a,b)=>{
//     console.log('---a,b---');
//     console.log(a,b);
//     const res1 = (...args)=>{
//       console.log('---args----');
//       console.log(...args);
//       const res2 = a(b(...args))
//       console.log('-----res2------');
//       console.log(res2);
//       return res2
//     }
//     console.log(res1);
//     return res1
//   })
//   console.log('----res-----');
//   console.log(res);
//   return res
// }
// const parseCompose = (...args)=>((((...args)=>f1(f2(...args)))(f3(...args)))(...args))
// parseCompose('omg')
// console.log(compose(f1,f2,f3));
// compose(f1,f2,f3)('omg')

// const composeFunc = (...args)=>(
//   (...args)=>((...args)=>f1(f2(...args)))
//   )(f3(...args))
// composeFunc('omg')


const test1 = new Promise(res=>{
  setTimeout(() => {
    res(new Promise((a)=>{
      setTimeout(() => {
      a({type:'Add'})
    }, 2000)
   }))
  }, 1000);
})

const p = test1.then(data=>{
  console.log(data)
  
  return new Promise(res=>{
    setTimeout(() => {
      res({type:'delete'})
    }, 3000);
  }).then(data=>{
    console.log(data);
    return {type:'remove'}
  })
})
p.then(data=>{
  console.log(data);
})
