import React, { Component } from 'react'
import { Consumer } from './RouterContext'
import matchPath from './matchPath'

//独占路由
//渲染与该地址匹配的第一个子节点<Route>或者<Redirect>
export default class Switch extends Component {
  render() {
    return (
      <Consumer>
        {context=>{
          const location = this.props.location || context.location
          let match;//标记匹配
          let element;//记录匹配的元素
          React.Children.forEach(this.props.children,child=>{
            if(!match&&React.isValidElement(child)){
              element = child;
              match = child.props.path
                      ?matchPath(location.pathname,child.props)
                      :context.match
            }
          })
          return match?React.cloneElement(element,{computedMath:match}):null
        }}
      </Consumer>
    )
  }
}
