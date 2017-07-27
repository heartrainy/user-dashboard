import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import classnames from 'classnames'

import { Table, Modal } from 'antd'
import { DropOption } from '../../components'

import styles from './UserList.less'


const confirm = Modal.confirm;

function UserList ({ onEditItem, onDeleteItem, location, ...tableProps }) {

  //列表设置
  const columns = [
    {
      title: '账号',
      dataIndex: 'loginName',
      key: 'loginName'
    }, {
      title: '姓名',
      dataIndex: 'personName',
      key: 'personName',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text) => <span>{text
            ? 'Male'
            : 'Female'}</span>,
    }, {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy',
    }, {
      title: '创建日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
      },
    },
  ]

  //操作
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record);
    } else if (e.key === '2') {
      confirm({
        title: '你确定要删除该条记录吗?',
        onOk () {
          onDeleteItem(record.id);
        },
      })
    }
  }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        scroll={{ x: 1200 }}
        simple
        columns={columns}
        rowKey={record => record.id}
      />
    </div>
  )
}

UserList.propTypes = {
  //onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  location: PropTypes.object
}

export default UserList
