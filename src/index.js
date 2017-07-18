import dva from 'dva';
import createLoading from 'dva-loading';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import { browserHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
  //history: useRouterHistory(createHashHistory)({ queryKey: false }),
  history: browserHistory
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/user'));

app.model(require("./models/app"));

app.model(require("./models/login"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
