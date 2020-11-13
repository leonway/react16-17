import React, { Component } from 'react'
import { ThemeConsumer, UserConsumer } from '../context'

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <h3>ConsumerPage</h3>
        <ThemeConsumer>
          {context=>(
           <>
            <div className={context.themeColor}>ThemeColor</div>
            <UserConsumer>
              {
                user=>(<div>
                  姓名：{user.name}
                </div>)
              }
            </UserConsumer>
           </>
          )}
        </ThemeConsumer>
      </div>
    )
  }
}
