import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import routes from '../routes'

const HeaderLayout = React.lazy(() => import('./HeaderLayout'))
const MenuLayout = React.lazy(() => import('./MenuLayout'))
const FooterLayout = React.lazy(() => import('./FooterLayout'))

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      _LOGIN_TOKEN: [],
      _PERMISSION_TOKEN: [],
    }
  }

  componentDidMount() {
    this.setState({
      _LOGIN_TOKEN: [],
      _PERMISSION_TOKEN: [],
    })
  }

  _onLogout(e) {
    e.preventDefault()

    localStorage.clear()
    window.location.reload()
  }

  render() {
    const { _LOGIN_TOKEN, _PERMISSION_TOKEN } = this.state
    return (
      <div className="app">
        <HeaderLayout onLogout={(e) => this._onLogout(e)} showMenu={(e) => this.setState({ toggled: !this.state.toggled })} />
        <div className={"d-flex " + (this.state.toggled ? "" : "toggled")} id="wrapper">
          <MenuLayout {...this.props} _LOGIN_TOKEN={_LOGIN_TOKEN} _PERMISSION_TOKEN={_PERMISSION_TOKEN} />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <main className="main">
                <React.Suspense fallback={null}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (<route.component {...props} />)}
                        />
                      ) : null
                    })}
                    <Redirect from="/" to="/user" />
                  </Switch>
                </React.Suspense>
              </main>
            </div>
          </div>
        </div>
        <FooterLayout />
      </div>
    );
  }
}


export default DefaultLayout;

