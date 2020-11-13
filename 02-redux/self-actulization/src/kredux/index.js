// const isObject = v =>typeof v==='object'&&v!==null
// function reactive(obj,host) {
//   if (!isObject(obj)) {
//     return obj
//   }
//   console.log(obj);
//   return new Proxy(obj, {
//     get(target, key, receiver) {
//       try {
//         const res = Reflect.get(target, key, receiver)
//         const real = isObject(res)?reactive(res):res
//         console.log('get', key,'target',target)
//         // 收集依赖
//         // track(target,key)
//         return real
//       } catch (e) {
//         console.log(e);
//       }
//     },
//     set(target, key, value, receiver) {
//       const res = Reflect.set(target, key, value, receiver)
//       // 触发副作用
//       host.notify()
//       console.log('set', key,'target',target)
//       return res
//     },
//     deleteProperty(target, key) {
//       const res = Reflect.deleteProperty(target, key)
//       console.log('deleteProperty', key,'target',target)
//       return res
//     }
//   })
// }

class Store{
  constructor(reducer){
    this.reducer = reducer
    this.state = this.reducer(null,{})
    this.listeners = new Set()
    console.log(this);
  }
}

Store.prototype.subscribe = function(cb) {
  this.listeners.add(cb)
  return ()=>{
    this.listeners.delete(cb)
  }
}

Store.prototype.getState=function () {
  console.log(this);
  return  this.state
}

Store.prototype.dispatch=function (action) {
  this.state = this.reducer(this.state,action)
  console.log(this);
  this.notify()
}

Store.prototype.notify= function () {
  console.log(this);
  if(this.listeners&&this.listeners.size){
    this.listeners.forEach(cb=>cb())
  }
}

const createStore = (reducer,middleware)=>{
  const store = new Store(reducer)
  console.log(store);
  return store
}

export {
  createStore
}
