import React from 'react'
import { 
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  Prompt
 } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import LoginPage from '../pages/LoginPage'
import _404Page from '../pages/_404Page'
import FunctionHomePage from '../pages/FunctionHomePage'

export const routes = [
  {
    path:'/',
    exact:true,
    component:HomePage
  },
  {
    path:'/user',
    component:UserPage,
    auth:PrivateRoute
  },
  {
    path:'/login',
    component:LoginPage
  },
  {
    component:_404Page
  }
]

export default function index({history}) {
  return (
    <Router>
      <Link to="/">首页</Link>|
      <Link to="/user">用户中心</Link> |
      <Link to="/login">登录</Link> 

      <Switch>
        {
          routes.map(Route_=>
            Route_.auth
            ?<Route_.auth key={Route_.path+"route"} {...Route_}/>
            :<Route key={Route_.path+"route"} {...Route_} />
            )
        }
        {/* <Route 
          path='/' 
          exact 
          component={HomePage} 
        />
        <Route path='/user' exact component={UserPage} />
        <Route path='/login' exact component={LoginPage} />
        <PrivateRoute path='/user' exact component={UserPage} />
        <Route component={_404Page} /> */}
      </Switch>
    </Router>
  )
}

