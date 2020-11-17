import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../routes';
const HeaderLayout = React.lazy(() => import('./HeaderLayout'))
const MenuLayout = React.lazy(() => import('./MenuLayout'))
const FooterLayout = React.lazy(() => import('./FooterLayout'))

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
    }
  }

  _signOut(e) {
    e.preventDefault()
    localStorage.clear();
    window.location.reload()
  }
  _showMenu(e) {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    })
  }
  render() {
    return (
      <div className="app">
        <HeaderLayout
          onLogout={(e) => this._signOut(e)}
          showMenu={(e) => this._showMenu(e)}
        />
        <div className={"d-flex " + (this.state.toggled ? "" : "toggled")} id="wrapper">
          <div id="sidebar-wrapper">
            <div className="sidebar-manu-top">
              <div className="sidebar-manu-top-text">
                <div style={{ fontSize: '1.2rem' }}>ERP</div>
                <div>Enterprise Resource Planning</div>
              </div>
            </div>
            <MenuLayout {...this.props} />
          </div>
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
                          render={props => (
                            <route.component {...props} />
                          )} 
                          />
                      ) : (null);
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

