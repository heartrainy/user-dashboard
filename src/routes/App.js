import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types'
import {Link} from 'dva/router';
import {Helmet} from 'react-helmet'
import {classnames, config, menu} from '../utils'
import {MainLayout} from '../components'
import {Layout, Menu, Icon} from 'antd'


import styles from './App.less';
import '../themes/index.less'

const {Bread, Footer, Menus} = MainLayout;
const {Sider, Header} = Layout;
const SubMenu = Menu.SubMenu;

function App({dispatch, children, location, app}) {
  const {collapsed, darkTheme, mode, navOpenKeys} = app;

  //菜单配置
  const menuProps = {
    darkTheme,
    mode,
    navOpenKeys,
    menu,
    location,
    changeOpenKeys (openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({type: 'app/handleNavOpenKeys', payload: {navOpenKeys: openKeys}})
    }
  };

  //面包屑配置
  const breadProps = {
    menu
  };


  function toggle() {
    dispatch({type: "app/toggle"});
  }


  //右上角事件点击
  function handleMenu(e) {
    if (e.key == "logout") {
      dispatch({type: "login/logout"});
    }
  }


  return (
    <div>
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {/*<link rel="icon" href={config.logoSrc} type="image/x-icon" />*/}
        {/*{config.iconFontUrl ? <script src={config.iconFontUrl}></script> : ''}*/}
      </Helmet>
      <div className={styles.layout}>
        <Layout className={styles.layout}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={styles.siderBg}
          >
            <div className={styles.logo}>
              <span>我的平台</span>
            </div>
            <Menus {...menuProps} defaultSelectedKeys={['1']}></Menus>
          </Sider>
          <Layout>
            <div className={styles.main}>
              <Header style={{background: '#fff', padding: 0}}>
                {/*<Icon*/}
                  {/*className={styles.trigger}*/}
                  {/*type={collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                  {/*onClick={toggle}*/}
                {/*/>*/}
                <div className="rightWarpper">
                  <div className="button">
                    <Icon type="mail"/>
                  </div>
                  <Menu mode="horizontal" onClick={handleMenu}>
                    <SubMenu style={{
                      float: 'right',
                    }} title={< span > <Icon type="user"/>adsd</span>}>
                      <Menu.Item key="logout">
                        退出
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                </div>
              </Header>
              <Bread {...breadProps} location={location}/>
              {/*<Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>*/}
              {/*{children}*/}
              {/*</Content>*/}
              <div className={styles.container}>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
              <Footer/>
            </div>
          </Layout>
        </Layout>
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
}

function mapStateToProps(app) {
  return app;
}

export default connect(mapStateToProps)(App);
