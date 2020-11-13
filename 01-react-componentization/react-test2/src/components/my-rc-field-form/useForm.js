import React from 'react'
//存储form的数据
class FormStore {
  constructor(){
    // 这里存储Form 要处理的数据
    this.store = {

    }

    this.fieldEntities = {}
  }

  registerEntity = (entity)=>{
    // console.log('entity',entity);
    this.fieldEntities = {
      ...this.fieldEntities,
      [entity.props.name]:entity
    }
    return ()=>{
      delete this.fieldEntities[entity.props.name]
    }
  }

  setCallback = (callback)=>{
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }

  getFieldValue = (name)=>{
    const v = this.store[name]
    // console.log(v);
    return v
  }

  setFieldValue = (newStore)=>{

    // step1: 修改store数据
    this.store = {
      ...this.store,
      ...newStore
    }
    // console.log(this.store);
    // console.log(this.fieldEntities);
    // step2: 更新组件
    Object.entries(this.fieldEntities).forEach(([name,entity])=>(name in newStore)&&entity.onStoreChange())

  }

  validateAll = (res,rej)=>{
    // let err = []

    // todo 遍历this.store
    const tasks = Object.entries(this.fieldEntities).map(([key,entity])=>entity.validate())
    try {
      Promise.all(tasks).then((results)=>results.reduce((state,result)=>[...state,...result])).then(errors=>{
        if(errors&&errors.length){
          rej(errors)
        }else{
          res()
        }
      })
      // .catch((...data)=>{rej(...data)})
    } catch (e) {
      console.log(e);
    }
    // Object.entries(this.fieldEntities).forEach(([key,entity])=>{
    //   const { rules } = entity
    //   const rule = rules && rules[0]
    //   if(rule&&rule.required&&value===undefined){}
    // })

    // return err
  }

  submit = ()=>{
    // console.log('submit');
    const { onFinish,onFinishFailed } = this.callbacks
    this.validateAll(()=>{
      onFinish&&onFinish({...this.store})
    },(errors)=>{
      onFinishFailed&&onFinishFailed(errors,{...this.store})
    })
    // if(!err.length){
    //   //onFinish({...this.store})
    // }else{
    //   //onFinishFailed(err,{...this.store})
    // }
  }

  getForm = ()=>{
    return {
      getFieldValue:this.getFieldValue,
      setFieldValue:this.setFieldValue,
      registerEntity:this.registerEntity,
      submit:this.submit,
      setCallback:this.setCallback
    }
  }
}

//自定义hook
export default function useForm(form) {
  const formRef = React.useRef()
  
  if(!formRef.current){
    if(form){
      formRef.current = form
    }else{
      const formStore = new FormStore()
      formRef.current = formStore
    }
  }
  
  return [formRef.current]
}
