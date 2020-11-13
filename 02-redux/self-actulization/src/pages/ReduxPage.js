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
    setTimeout(() => {
      store.dispatch({type:'ADD'})
    }, 1000);
  }

  promiseAdd = async ()=>{
   const isOk = await new Promise(res=>setTimeout(() => {
      res(true)
    }, 1000))
    isOk&&store.dispatch({type:'ADD'})
  } 


  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add} >Add</button>
        <button onClick={this.asyncAdd} >Async Add</button>
        <button onClick={this.promiseAdd} >promiseAdd</button>
      </div>
    )
  }
}
