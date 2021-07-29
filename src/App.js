import React from 'react';
import './App.scss';

import { HashRouter, Route, Switch, } from 'react-router-dom';
const Login = React.lazy(() => import('./views/Login'));
const MainLayout = React.lazy(() => import('./containers/MainLayout'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
function App() {
  const user_login = JSON.parse(localStorage.getItem('user_login'));
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
          <Route path="/" name="Home" render={props => user_login === null ? <Login {...props} /> : <MainLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}
export default App;