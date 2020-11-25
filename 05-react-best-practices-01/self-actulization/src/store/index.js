import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import createSagaMiddleware from 'redux-saga'
import { loginReducer } from './loginReducer'
import thunk from 'redux-thunk'
import rootSaga from '../action/rootSaga'
// import loginSaga from '../action/loginSaga'

//创建
const sagaMiddleware = createSagaMiddleware()

// logger要作为applyMiddleware的最后一个参数，不然不能保证action是plain object
const store = createStore(
  // countReducer,
  combineReducers({
    user:loginReducer
  }),
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

//运行
sagaMiddleware.run(rootSaga)

export default store;
