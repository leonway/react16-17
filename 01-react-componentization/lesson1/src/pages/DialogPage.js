// 常见用法如下：Dialog在当前组件声明，但是却在body中另一个div中显示 
import React, {Component} from "react"; 
import Dialog from "../components/Dialog"; 
export default class DialogPage extends Component { 
  constructor(props) { 
    super(props); 
    this.state = { showDialog: false }; 
  }
  render() { 
    const {showDialog} = this.state; 
    console.log('render',showDialog);
    return ( <div> 
      <h3>DialogPage</h3> 
      <button 
      onClick={() => this.setState({ showDialog: !showDialog }) }
      >
        toggle 
      </button> 
      {showDialog && <Dialog hideDialog={()=>this.setState({showDialog:false})} />} 
      </div> 
      ); 
    } 
  }
