import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { LOGIN_SUCCESS } from '../action/const'
import { login } from '../action/user'

@connect(({user})=>({...user}),{login})
export default class LoginPage extends Component {

  state = {}

  nameChange = (e)=>{
    this.setState({
      name:e.target.value
    })
  }

  render() {
    const { isLogin, location, dispatch, login, err, loading } = this.props
    console.log(this.props);
    const { from = "/" } = location.state || {} 
    if(isLogin){
      return <Redirect to={from} />
    }
    const { name } = this.state;

    return (
      <div>
        <h3>LoginPage</h3>
        <input type='text' value={name} onChange={this.nameChange} /> 
        <p className="red">{err.msg}</p>
        <button
          onClick={()=>login({name})}
        >{
          loading?'loading':"登录"
        }</button>
        
      </div>
    );
  }
}
