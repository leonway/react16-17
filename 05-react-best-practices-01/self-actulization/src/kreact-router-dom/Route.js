import React, { Component } from 'react'
import { Consumer,Provider } from './RouterContext'
import matchPath from './matchPath'

export default class Route extends Component {
  
  render() {

    return (
                <Consumer>
                {
                  (context)=>{
                    // console.log(location,path);
                    const { location } = context
                    const { path,component,children,render, computedMath} = this.props
                    const match = computedMath//Switch 优先级更高 因为在switch已经做过一次匹配所以如果存在 就直接用
                                    ?computedMath
                                    :path
                                      ?matchPath(location.pathname,this.props)
                                      :context.match
                    // console.log(match);
                    const props = {
                      ...context,
                      match
                    }
                    //match children>component>render>null
                    //不match children有 渲染children, children没有 返回null
                    //外层再包一层Provider 放入当前路由层级的上下文 确保 在当前层级取上下文时 是具体的匹配
                    return (<Provider value={props}>
                      {(
                    match
                      ?children
                        ?children instanceof Function
                          ?children(props)
                          :children
                        :component
                          ?React.createElement(component,props)
                          :render
                            ?render instanceof Function
                              ?render()
                              :null
                            :null
                      :children
                        ?children instanceof Function
                          ?children(props)
                          :children
                        :null
                  )}
                  </Provider>)
                  // console.log(location,path,match);
                  // return match?React.createElement(component):null
                }
              }
              </Consumer>
            )
  }
}
