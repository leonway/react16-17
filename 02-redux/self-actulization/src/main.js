import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
// import App from './pages/DialogPage';


ReactDOM.render(<App />,document.getElementById('root'));

const array1 = [1,2,3,4];
const reducer = (a,b)=>{
  console.log('---------a,b---------');
  console.log(a,b);
  return a+b
}

// console.log(array1.reduce(reducer));

function f1(arg) {
  console.log('f1',arg);
  return arg
}

function f2(arg) {
  console.log('f2',arg);
  return arg
}

function f3(arg) {
  console.log('f3',arg);
  return arg
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

compose(f1,f2,f3)('omg')


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
