import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { bindActionCreators, connect } from '../kreact-redux'
// import { bindActionCreators } from 'redux'
@connect(
  (state)=>({...state}),
  // 第一种
  // {
  //   add:()=>({type:'ADD'}),
  //   asyncAdd:()=>(dispatch,getState)=>{
  //     setTimeout(() => {
  //       dispatch({type:'ADD'})
  //     }, 1000)
  //   },
  //   promiseAdd:()=>(new Promise((res,rej)=>setTimeout(() => {
  //     const ran = Math.random()>.1
  //     if(ran){
  //       const result = new Promise((a,b)=>setTimeout(() => {
  //         a({type:'ADD'})
  //       }, 2000))
  //       console.log(result);
  //       res(result)
  //     }else{
  //       rej('出问题了')
  //     }
  //   }, 1000))),
  //   changeName:(e)=>({type:'changeName',payload:e.target.value}),
  //   changeAge:(e)=>({type:'changeAge',payload:e.target.value})
  // }
  // 第二种
  // (dispatch)=>({
  //     add:()=>dispatch({type:'ADD'}),
  //     asyncAdd:()=>dispatch((dispatch,getState)=>{
  //       setTimeout(() => {
  //         dispatch({type:'ADD'})
  //       }, 1000)
  //     }),
  //     promiseAdd:()=>dispatch(new Promise((res,rej)=>setTimeout(() => {
  //       const ran = Math.random()>.1
  //       if(ran){
  //         const result = new Promise((a,b)=>setTimeout(() => {
  //           a({type:'ADD'})
  //         }, 2000))
  //         console.log(result);
  //         res(result)
  //       }else{
  //         rej('出问题了')
  //       }
  //     }, 1000))),
  //     changeName:(e)=>dispatch({type:'changeName',payload:e.target.value}),
  //     changeAge:(e)=>dispatch({type:'changeAge',payload:e.target.value})
  //   })
  (dispatch)=>{
    const creations = {
        add:()=>({type:'ADD'}),
        asyncAdd:()=>(dispatch,getState)=>{
          setTimeout(() => {
            dispatch({type:'ADD'})
          }, 1000)
        },
        promiseAdd:()=>(new Promise((res,rej)=>setTimeout(() => {
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
        }, 1000))),
        changeName:(e)=>({type:'changeName',payload:e.target.value}),
        changeAge:(e)=>({type:'changeAge',payload:e.target.value})
      }

      return {
        dispatch,
        ...bindActionCreators(creations,dispatch)
      }
  }
  )
class ReactReduxPage extends Component {
  static propTypes = {

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <div className="countBlock">
          <p>{this.props.count}</p>
          <button onClick={()=>{
            this.props.dispatch({type:'ADD'})
          }} >Add</button>
          <button onClick={this.props.asyncAdd} >Async Add</button>
          <button onClick={this.props.promiseAdd} >promiseAdd</button>
        </div>
        <div className="userBlock">
          <h6>姓名：{this.props.user.name}</h6>
          <input type="text" value={this.props.user.name} onChange={this.props.changeName}/>
          
          <h6>年龄：{this.props.user.age}</h6>
          <input type="text" value={this.props.user.age} onChange={this.props.changeAge}/>
        </div>
      </div>
    )
  }
}

// export default connect((state)=>({...state}))(ReactReduxPage)
export default ReactReduxPage
