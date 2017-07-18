import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import {Row, Form, Icon, Input, Button, Checkbox} from 'antd';
import { config } from '../../utils'
import styles from './Login.less';

const FormItem = Form.Item;

function Login({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) {
  //state
  const { loginLoading } = login


  //登录方法
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      //发送dispatch请求
      dispatch({type: 'login/login', payload: values})
    })
  }


  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('loginName', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
            Sign in
          </Button>
          <p>
            <span>Username：admin</span>
            <span>Password：123456</span>
          </p>
        </Row>

      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
  form: PropTypes.object
}

function mapStateToProps(login) {
  return login;
}

export default connect(mapStateToProps)(Form.create()(Login));
