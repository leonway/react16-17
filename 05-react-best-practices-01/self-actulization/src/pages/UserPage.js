import React, {Component} from "react";
import { connect } from 'react-redux'


@connect(({user})=>({...user.userInfo}))
export default class UserPage extends Component {
  render() {
    const { name, id, score } = this.props
    return (
      <div>
        <h3>UserPage</h3>
        <p>name:{name}</p>
        <p>id:{id}</p>
        <p>score:{score}</p>
      </div>
    );
  }
}
