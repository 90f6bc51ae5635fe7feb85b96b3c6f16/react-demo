import React from 'react';
import logo from '../assets/img/revel-soft-logo.png'
class HeaderLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_login: JSON.parse(localStorage.getItem('user_login')),
      show: false
    }
  }
  render() {
    const { user_login } = this.state
    return (
      <div className="app-header navbar">
        <div className="app-header-sub" >
          <a className="active div-logo" href="#/" >
            <img src={logo} alt="Ravel Soft Logo" className="navbar-brand-full img-logo" />
          </a>
          <div className="on-logo" >
            <div className="text-logo">
              <strong ><span style={{ color: "#f36523" }}><b>REVEL</b></span> <span style={{ color: "rgb(102, 192, 9)" }}><b>SOFT</b></span> </strong>
            </div>
            <button className="navbar-toggler" type="button" onClick={e => this.props.showMenu(e)}>
              <span className="fa fa-bars"></span>
            </button>
            <div>
            </div>
          </div>
          <div className="ml-auto navbar-nav" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingRight: '50px' }}>
            <div className="nav-link" style={{ color: "rgb(102, 192, 9)" }} onClick={() => this.setState({ show: !this.state.show })}>
              <span style={{ paddingLeft: 8, paddingRight: 8 }}>{user_login !== null ? user_login.user_name + '  ' + user_login.user_lastname : null}</span>
              <i className="fa fa-user"></i>
            </div>
            <div className={"header-menu " + (this.state.show ? "show" : "")}>
              <div className="header-menu-item">
                <button type="button" className="dropdown-item" onClick={e => this.props.onLogout(e)} ><i className="fa fa-lock"></i>  Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default HeaderLayout;

