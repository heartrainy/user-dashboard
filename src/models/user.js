import modelExtend from 'dva-model-extend';
import { pageModel } from './common'
import * as usersService from '../services/user';

export default modelExtend(pageModel, {
  namespace: 'user',
  state: {
    modalVisible: false,
    modalType: 'create',
    currentItem: {}
  },
  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    }
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(usersService.query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total
            }
          }
        })
      }
    },
    *create({ payload: values }, { call, put }) {
      const data = yield call(usersService.create, values);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data
      }
    },
    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id);
      const newUser = { ...payload, id };
      const data = yield call(usersService.update, newUser);
      if (data.success) {
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        throw data
      }
    },
    *remove ({ payload }, { call, put, select }) {
      const data = yield call(usersService.remove, { id: payload });
      //const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        //yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        console.log(pathname);
        if (pathname === '/user') {
          dispatch({ type: 'query', payload: query });
        }
      });
    }
  }
});
