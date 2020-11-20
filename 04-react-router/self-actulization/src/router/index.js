import React from 'react'
// import { 
//   BrowserRouter as Router,
//   // HashRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
//   withRouter,
//   useHistory,
//   useLocation,
//   useRouteMatch,
//   useParams,
//   Prompt
//  } from 'react-router-dom'
import { 
  // BrowserRouter as Router,
  // HashRouter as Router,
  MemoryRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
  Prompt
  // Redirect
 } from '../kreact-router-dom'
import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import LoginPage from '../pages/LoginPage'
import _404Page from '../pages/_404Page'
import FunctionHomePage from '../pages/FunctionHomePage'

export default function index({history}) {
  const [count,setCount] = React.useState(0)
  // console.log(Router,Route,Link);
  return (
    <Router>
      <button onClick={()=>{setCount(count+1)}}>add</button>
      <p>{count}</p>
      <Link to="/">首页</Link>|
      <Link to="/user">用户中心</Link> |
      <Link to="/login">登录</Link> |
      <Link to="/product/123">商品</Link>|
      <Link to="/fdefsd">404</Link>

      <Switch>
        <Route 
          path='/' 
          exact 
          // children={children}
          // component={HomePage} 
              render={()=><HomePage />} 
        />
        <Route 
          path='/product/:xx' 
          render={()=><Product />} 
        />
        <Route path='/user' exact component={UserPage} />
        <Route path='/login' exact component={LoginPage} />

        <Route component={_404Page} />
      </Switch>
    </Router>
  )
}

function children(props) {
  console.log("children props", props); //sy-log

  return <div>children</div>;
}

function render(props) {
  console.log("render props", props); //sy-log
  return <div>render</div>;
}

@withRouter
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {confirm: true};
    console.log(props);
    // let unblock = props.history.block(tx => {
    //   let url = tx.location.pathname;
    //   if (window.confirm(`Are you sure you want to go to ${url}?`)) {
    //     // Unblock the navigation.
    //     unblock();
    
    //     // Retry the transition.
    //     tx.retry();
    //   }
    // })
  }
  render() {
    const {match} = this.props;
    const {url} = match;
    const {id} = match.params;
    console.log(match,url,id);
    
    return (
      <div>
        Product:{id}
        <Link to={url + "/detail"}>详情</Link>
        <Route path={url + "/detail"} component={Detail} />
        <Prompt
          when={this.state.confirm}
          // message="Are you sure you want to leave?"
          message={location => {
            return "Are you sure you want to leave-fun";
          }}
          // message={"Are you sure you want to leave-fun"}
          // message={location => {
          //   return true;
          // }}
        />
      </div>
    );
  }
}

// function Product(props) {
//   const history = useHistory();
//   const location = useLocation();
//   const match = useRouteMatch();
//   const params = useParams();

//   console.log("props", match, params); //sy-log
//   // const {match} = props;
//   const {url} = match;
//   const {id} = match.params;

//   return (
//     <div>
//       Product:{id}
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail} />
//     </div>
//   );
// }

function Detail(props) {
  console.log("Detail props", props); //sy-log
  return <div>Detail</div>;
}
