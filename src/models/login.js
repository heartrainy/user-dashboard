import {routerRedux} from 'dva/router'
import {message} from 'antd'
import {login, logout, heart, test} from '../services/login'

export default {
  namespace: 'login',
  state: {
    loginLoading: false
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    }
  },
  effects: {
    *login({payload}, {put, call}){
      payload.txyzm = "";
      yield put({type: 'showLoginLoading'});
      const data = yield call(login, payload);
      yield put({type: 'hideLoginLoading'});
      if (data.isSuccess) {
        //yield put(routerRedux.push('/home'));
        //启动心跳
        // clearInterval(window.heart);
        // setInterval(function () {
        //   const data = call(heart);
        //   console.log(data);
        // }, 5000);
        const data = yield call(test);
        console.log(data);
      } else {
        message.error(data.message);
      }
    },
    *logout({payload}, {put, call}){
      yield put({type: 'showLoginLoading'});
      const data = yield call(logout);
      yield put({type: 'hideLoginLoading'});
      if (data.isSuccess) {
        yield put(routerRedux.push('/login'));
      } else {
        message.error(data.message);
      }
    },
    *heart({payload}, {put, call}){
      const data = yield call(heart);
      console.log(data);
    },
    *test(){
      const data = yield call(test);
      console.log(data);
    }
  },
  subscriptions: {}
};
