import React, { Component } from 'react'
import { Provider } from './RouterContext'

export default class Router extends Component {
  static computeRootMatch(pathname){
    return {
      path:'/',
      url:'/',
      params:{},
      isExact:pathname==='/'
    }
  }

  constructor(props){
    super(props)
    console.log(props.history.location);
    this.state={
      location:props.history.location
    }
    //监听路由
    this.unlisten = props.history.listen(({location})=>{
      console.log(location);
      this.setState({location})
    })
  }

  componentWillUnmount(){
    console.log(this.unlisten);
    this.unlisten&&this.unlisten()
  }

  render() {
    return (
      <Provider value={{
          history:this.props.history,
          location:this.state.location,
          match:Router.computeRootMatch(this.state.location.pathname)
        }}>
        {this.props.children}
      </Provider>
    )
  }
}
