import React from 'react';
import './App.scss';

import { HashRouter, Route, Switch, } from 'react-router-dom';
const Login = React.lazy(() => import('./views/Login'));
const MainLayout = React.lazy(() => import('./containers/MainLayout'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
function App() {
  const user_login = JSON.parse(localStorage.getItem('user_login'));
  if (user_login === null) {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet" />
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route path="/" name="Home" render={props => <Login {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  } else {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet" />
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route path="/" name="Home" render={props => <MainLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
export default App;