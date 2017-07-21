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
      //登录请求返回true或false
      const data = yield call(login, payload);
      yield put({type: 'hideLoginLoading'});
      if (data.isSuccess) {
        //查询用户信息及菜单
        yield put({ type: 'app/query' });
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
    },
    *test({payload}, {put, call}){
      const data = yield call(test);
      console.log(data);
    }
  },
  subscriptions: {}
};
