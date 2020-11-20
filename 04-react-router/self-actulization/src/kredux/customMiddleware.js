import { isFSA } from 'flux-standard-action'
import isPromise from "is-promise";

export const thunk =  (midApi={})=>(next)=>{
  //console.log('-----thunk next-----');
  //console.log(next);
  return (action)=>{
  //console.log('-----thunk action-----');
  //console.log(action);
    // //console.log('----next------');
    // //console.log(next);
    // //console.log('----action------');
    // //console.log(action);
    let returnValue;
    if(action instanceof Function){
      // //console.log(midApi);
      returnValue = action(midApi.dispatch,midApi.getState)
    }
    else{
      returnValue =  next(action)
    }
      //console.log('+++++++logger returnValue++++++++');
      //console.log(returnValue);
    return returnValue
  }
}

export const logger = (midApi={})=>(next)=>{
  //console.log('-----logger next-----');
  //console.log(next);
  return (action)=>{

  //console.log('-----logger action-----');
  //console.log(action);
    // //console.log("+++++++++++++++++++");
    // //console.log(midApi);
    // //console.log('======next=====');
    // //console.log(next);
    const preState = midApi.getState()
    // //console.log('prev State',preState);
  
    const returnValue = next(action)
  
    const nextState = midApi.getState()
    // //console.log('next State', nextState);
    // //console.log('+++++++++++++++++++');
    //console.log('+++++++logger returnValue++++++++');
    //console.log(returnValue);
    return returnValue
  }
}

export const test = (midApi={})=>(next)=>{
  //console.log('----test next-----');
  //console.log(next);
  return action=>{
    //console.log('-----test action-----');
    //console.log(action);
    const returnValue = next(action)
    //console.log('+++++++test returnValue++++++++');
    //console.log(returnValue);
    return returnValue
  }
}


function _objectSpread(target) { //完全克隆 将对象的属性所有特性一并拷贝
  for (var i = 1; i < arguments.length; i++) { 
    var source = arguments[i] != null ? arguments[i] : {}; 
    var ownKeys = Object.keys(source); 
    if (typeof Object.getOwnPropertySymbols === 'function') { 
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { 
        return Object.getOwnPropertyDescriptor(source,sym).enumerable; 
      })); 
    } 
    ownKeys.forEach(function (key) { 
      _defineProperty(target,key,source[key]); 
    }); 
  } 
  return target; 
}

function _defineProperty(obj,key,value) { 
  if (key in obj) { 
    Object.defineProperty(obj,key,{ 
      value: value,
      enumerable: true,
      configurable: true,
      writable: true }); 
    } 
    else { 
      obj[key] = value; 
    } 
    return obj; 
  }

export const promise =  (midApi={})=>(next)=>{
  //console.log('-----promise next-----');
  //console.log(next);
  return action=>{
    //console.log('-----promise action-----');
    //console.log(action);
    let returnValue;
    if(!isFSA(action)){
      returnValue = isPromise(action)?action.then((...data)=>{
        //console.log(data);
        midApi.dispatch(...data)
      }):next(action)
    }else{
      returnValue = isPromise(action.payload)?action.payload.then(result=>midApi.dispatch(
        _objectSpread({},action,{payload:result})
      )).catch((error)=>{
        midApi.dispatch(
          _objectSpread({},action,{payload:error,error:true})
        )
        return Promise.reject(error)
      }):next(action)
    }
    //console.log('+++++++promise returnValue++++++++');
    //console.log(returnValue);
    return returnValue
  }
}
