import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
// import { Provider } from 'react-redux'
import { Provider } from 'react-redux'
import store from "./store"

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));

// function *test(params) {
//   yield 'hello'
//   yield 'world'
//   return 'good bye'
// }

// const hw = test()

// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

let a = 0

function *test2(params) {
  let aa = yield (a=1+1)
  console.log('---aa---');
  console.log(aa);
  return aa
}

const it = test2()

console.log(a); //0
console.log(it.next()); //{value:2,done:false}
console.log(a); //2 
console.log(it.next(666));//{value:undefined,done:true}
console.log(a);//2
console.log(it.next());//{value:undefined,done:true}
