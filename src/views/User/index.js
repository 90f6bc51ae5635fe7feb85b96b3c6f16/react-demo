import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));
class User extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/user" name="Login Page" render={props => <View {...props} />} />
            <Route exact path="/user/insert" name="Login Page" render={props => <Insert {...props} />} />
            <Route exact path="/user/update/:user_code" name="Login Page" render={props => <Update {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}
export default (User);
