import React, { Component } from 'react'
import store from '../store'

export default class reduxPage extends Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  
  componentWillUnmount(){
    if(this.unsubscribe){
      this.unsubscribe()
    }
  }

  add = ()=>{
    store.dispatch({type:'ADD'})
  }

  asyncAdd = ()=>{
    // setTimeout(() => {
    //   store.dispatch({type:'ADD'})
    // }, 1000);
    store.dispatch((dispatch,getState)=>{
      setTimeout(() => {
        dispatch({type:'ADD'})
      }, 1000)
    })
  }

  promiseAdd = async ()=>{
    store.dispatch(new Promise((res,rej)=>setTimeout(() => {
      const ran = Math.random()>.1
      if(ran){
        const result = new Promise((a,b)=>setTimeout(() => {
          a({type:'ADD'})
        }, 2000))
        console.log(result);
        res(result)
      }else{
        rej('出问题了')
      }
    }, 1000)))
   
  } 

  changeAge = (e)=>{
    store.dispatch({type:'changeAge',payload:e.target.value})
  }

  changeName = (e)=>{
    store.dispatch({type:'changeName',payload:e.target.value})
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div className="countBlock">
          <p>{store.getState().count}</p>
          <button onClick={this.add} >Add</button>
          <button onClick={this.asyncAdd} >Async Add</button>
          <button onClick={this.promiseAdd} >promiseAdd</button>
        </div>
        <div className="userBlock">
          <h6>姓名：{store.getState().user.name}</h6>
          <input type="text" value={store.getState().user.name} onChange={this.changeName}/>
          
          <h6>年龄：{store.getState().user.age}</h6>
          <input type="text" value={store.getState().user.age} onChange={this.changeAge}/>
        </div>
      </div>
    )
  }
}
