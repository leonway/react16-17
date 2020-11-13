import React, { Component } from 'react'
import FieldContext from './FieldContext'
import Validator from "async-validator"

export default class Field extends Component {
  static contextType = FieldContext

  state = {}

  componentDidMount() {
    console.log(this.props);
    this.unregisterEntity = this.context.registerEntity(this)
  }
  
  componentWillUnmount(){
    this.unregisterEntity&&this.unregisterEntity()
  }

  validate(){
    const { 
      getFieldValue,
      setFieldValue
     } = this.context
    //执行校验
      //1.获取数值和校验规则
      const rules = this.props.rules
      const value = getFieldValue(this.props.name)

      //async-validator
      const validator = new Validator({
        [this.props.name]:rules
      })
      // 校验时传入数据源
      return new Promise((res)=>{
        validator.validate({[this.props.name]:value},errors=>{
          //errors存在,则检验失败
          if(errors){
            console.log(this);
            this.setState({error:errors[0].message})
            // this.error = errors[0].message
            res(errors)
          }else{
            //通过
            console.log(this);
            this.setState({error:''})
            res([])
          }
        })
      })
  }

  onStoreChange = ()=>{
    this.forceUpdate()
  }

  getControlled = ()=>{
    const { 
      getFieldValue,
      setFieldValue
     } = this.context
    const {name} = this.props
    // console.log('getNewValue',getFieldValue(this.props.name));
    return {
      value:getFieldValue(this.props.name),// 从formStore 当中读取数据
      onChange:(e)=>{
        const newValue = e.target.value
        //设置formStore的数据
        setFieldValue({[name]:newValue})
        // console.log('newValue',newValue);
      }
    }
  }
  render() {
    const { children } = this.props
    console.log(this.state.error);
    return <div>
      {React.cloneElement(children,this.getControlled()) }
      {this.state.error?<p>{this.state.error}</p>:null}
    </div>
  }
}
