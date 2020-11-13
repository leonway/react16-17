import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

function Form({ children, onFinish, onFinishFailed, form },ref) {
  const [formInstance] = useForm(form);
  // console.log(formInstance,form,ref );
  if(ref){
    ref.current = formInstance
  }
  // React.useImperativeHandle(ref,()=>formInstance)
  formInstance.setCallback({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}>
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
}

export default Form;
