/*
 * @Author: xxx
 * @Description: 实现combineReducers
 * @Position: 
 * @Date: 2020-11-17 11:21:36
 * @LastEditors: xxx
 */

function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

 export default function combineReducers(reducers) {
  //  if(){}
  let finalReducers ={}
  const reducerKeys = Object.keys(reducers)

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  return (currentState,action)=>{
    if(!currentState){
      currentState = {}
    }
    
    let hasChanged = false
    const nextState = {}

    const finalReducerKeys = Object.keys(finalReducers)

    for(let _i = 0; _i < finalReducerKeys.length; _i++){
      const key = finalReducerKeys[_i]
      const reducer = finalReducers[key]
      const prevStateForKey = currentState[key]
      const nextStateForKey = reducer(prevStateForKey,action)

      if(nextState===undefined){
        throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || prevStateForKey!==nextStateForKey
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(currentState).length;

    return hasChanged?nextState:currentState
  }

 }
