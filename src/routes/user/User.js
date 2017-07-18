import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import UserFilter from './UserFilter'
import UserList from './UserList'
import UserModal from './UserModal'

const User = ({location, dispatch, user, loading}) => {
  //user的state
  const {list, pagination, modalType, modalVisible, currentItem} = user;
  const { pageSize } = pagination;

  //搜索栏及工具栏属性
  const userFilterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      console.log(value);
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize
        }
      }))
    },
    onAdd () {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'create',
        }
      })
    }
  };

  //用户列表属性
  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    onChange (page) {
      const {query, pathname} = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }
      }))
    },
    onEditItem (item) {
      dispatch({
        type: 'user/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        }
      })
    },
    onDeleteItem (id) {
      dispatch({
        type: 'user/remove',
        payload: id,
      })
    }
  };

  //用户窗口属性
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    title: `${modalType === 'create' ? '创建用户' : '编辑用户'}`,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `user/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      });
    }
  };

  return (
    <div className="content-inner">
      <UserFilter {...userFilterProps} />
      <UserList {...userListProps} />
      {modalVisible && <UserModal {...userModalProps} />}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}


export default connect(({user, loading}) => ({user, loading: loading.models.user}))(User)
