import React, { Component } from "react";
import PropTypes from "prop-types";
import { ThemeContext, UserContext } from "../context";
export default class HomePage extends Component {
  static propTypes = {
    theme: PropTypes.object,
  };
  static contextType = ThemeContext
  // static contextType = UserContext   //contextType 不能使用多个context

  render() {
    const { themeColor,name } = this.context;
    console.log(this);
    return (
      <div>
        <h3 className={themeColor}>HomePage</h3>
        <p>姓名：{name}</p>
      </div>
    );
  }
}
// HomePage.contextType = ThemeContext;
