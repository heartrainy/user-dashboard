module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: 'https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png',
  iconFontUrl: '//at.alicdn.com/t/font_c4y7asse3q1cq5mi.js',
  baseURL: 'http://localhost:8000/api',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7001', 'http://192.168.1.110:8000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userList: '/user',
    userAdd: '/userAdd',
    userEdit: '/userEdit',
    userRemove: '/userRemove',
    userLogin: '/bizsyscst/login/login',
    userLogout: '/bizsyscst/login/dataLogout',
    userInfo: '/userInfo',
    dashboard: '/dashboard',
    userHeart: '/bizsyscst/login/heart',
    userTest: '/bizsyscst/login/test'
  },
}