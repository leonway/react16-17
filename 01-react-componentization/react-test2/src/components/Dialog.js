import React, {Component} from "react";
import {createPortal} from "react-dom";

  // let DialogId = {} 
  // const defineReactive = function(obj,key,val) {
  //   Object.defineProperty(obj,key,{
  //     get(){
  //       console.log('get',val);
  //       return val
  //     },
  //     set(newVal){
  //       console.log('set',newVal);
  //       val = newVal
  //     }
  //   })
  // }
  // defineReactive(DialogId,'id',0)

 class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = 
    this.createNode()
    // console.log('---constructor----');
    // console.log(JSON.stringify(DialogId));
    // this.DialogId = DialogId.id
    // DialogId.id = DialogId.id+1
  }

  createNode = ()=>{
    console.log('createNode');
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  componentWillUnmount() {
    if (this.node) {
      window.document.body.removeChild(this.node);
    }
  }

  render() {
    return createPortal(
      <div className="dialog">
        <h3>Didalofdfdg</h3>
      </div>,
      this.node
    );
    return <div>xxx</div>
  }
}
export default React.memo(Dialog)
