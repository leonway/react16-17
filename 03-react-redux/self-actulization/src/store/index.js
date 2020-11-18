// import { createStore, applyMiddleware, combineReducers} from "../../node_modules/redux/dist/redux";
import {createStore, applyMiddleware, combineReducers} from "../kredux/";
// import thunk from "redux-thunk"; // 异步解决方案
// import logger from "redux-logger"; // 打印日志
// import promise from "redux-promise"; // 处理promise

import { logger, thunk, test, promise } from '../kredux/customMiddleware'
// import isPromise from "is-promise";

// 定义修改store state的规则
export function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - (action.payload || 1);
    default:
      return state;
  }
}

// 定义修改store state的规则
function userReducer(state = {name:'liming',age:26}, action) {
  switch (action.type) {
    case "changeName":
      return {...state,name:action.payload};
    case "changeAge":
      return {...state,age:action.payload};
    default:
      return state;
  }
}


// logger要作为applyMiddleware的最后一个参数，不然不能保证action是plain object
const store = createStore(
  // countReducer,
  combineReducers({
    count: countReducer,
    user:userReducer
  }),
  applyMiddleware(promise,test,thunk, logger)
);

export default store;

// // function a() {
// //   return {
// //     return {}
// //   }
// // }

// function logger({dispatch, getState}) {
//   return next => action => {
//     console.log("++++++++++++++++++++++++++"); //sy-log

//     console.log(action.type + "执行了！！！"); //sy-log

//     const prevState = getState();
//     console.log("prev state", prevState); //sy-log

//     // todo
//     const returnValue = next(action);

//     const nextState = getState();
//     console.log("prev state", nextState); //sy-log

//     console.log("++++++++++++++++++++++++++"); //sy-log

//     return returnValue;
//   };
// }

// function thunk({dispatch, getState}) {
//   return next => action => {
//     // action 数据类型是？对象 | 函数
//     if (typeof action === "function") {
//       return action(dispatch, getState);
//     }
//     return next(action);
//   };
// }

// function promise({dispatch}) {
//   return next => action => {
//     return isPromise(action) ? action.then(dispatch) : next(action);
//   };
// }
