//监听 takeEvery
//调用异步操作 call
//状态更新（dispatch） put




import { call, put, takeEvery, takeLastest } from 'redux-saga/effects'

//worker saga
function* loginHandle(props) {
  console.log('==================');
  yield new Promise(res=>{
    setTimeout(() => {
      res()
    }, 2000);
  })
  yield put({type:"ADD"})
  console.log('==================');
}

//watch saga
function* mySaga(props) {
  yield takeEvery("asyncAdd",loginHandle)
}

export default mySaga
