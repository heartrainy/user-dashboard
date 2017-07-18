import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import User from "./routes/user/User.js";

import Login from "./routes/login/Login.js";


import Home from "./routes/home/Home.js";


import App from "./routes/App.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="user" component={User} />
        <Route path="home" component={Home} />
      </Route>
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default RouterConfig;
