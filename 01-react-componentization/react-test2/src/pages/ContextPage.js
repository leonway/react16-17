import React, { Component } from 'react'
import HomePage from './HomePage'
import UseContextPage from './UserPage'
import ConsumerPage from './ConsumerPage'
import { ThemeProvider, UserProvider } from '../context'

export default class ContextPages extends Component {
  constructor(props){
    super(props)
    this.state = {
      theme:{
        themeColor:'red'
      },
      user:{
        name:'reamey'
      }
    }
  }

  render() {
    const { theme, user } = this.state
    return (
      <div>
        <ThemeProvider value={theme}>
          <UserProvider value={user}>
            <HomePage />
            <UseContextPage/>
            <ConsumerPage />
          </UserProvider>
        </ThemeProvider>
      </div>
    )
  }
}
