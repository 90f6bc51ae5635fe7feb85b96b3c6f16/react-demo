import React, { Component } from 'react';
import Swal from 'sweetalert2'
import UserModel from '../../models/UserModel';

const user_model = new UserModel();
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_username: '',
      user_password: '',
      fireRedirect: false
    }
  }
  async componentDidMount() {
  }
  async handleSubmit(event) {
    event.preventDefault();
    if (this._checkSubmit()) {
      const user_login = await user_model.checkLogin({
        user_username: this.state.user_username,
        user_password: this.state.user_password,
      });
      if (user_login.data.length) {
        localStorage.setItem('user_login', JSON.stringify(user_login.data[0]));
        window.location.reload();
      } else {
        Swal.fire({
          title: "Warning!",
          text: "Please Check Your  Username  Or Password ",
          icon: "warning",
          button: "Close",
        });
      }
    }
  }
  _checkSubmit() {
    if (this.state.user_username === "") {
      Swal.fire({
        title: "Warning!",
        text: "Please Check Your Username ",
        icon: "warning",
        button: "Close",
      });
      return false
    } else if (this.state.user_password === "") {
      Swal.fire({
        title: "Warning!",
        text: "Please Check Your Password ",
        icon: "warning",
        button: "Close",
      });
      return false
    } else {
      return true
    }
  }
  render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="justify-content-center login">
          <div md="6">
            <div className="p-4  background-login-card">
              <div className="background-login-div">
                <h1>เข้าสู่ระบบ</h1>
                <div>
                  <div addontype="prepend" style={{ textAlign: "right" }}>
                    <span style={{ width: 32, display: "inline-block", textAlign: "center", }}>
                      <i className="fa fa-user-o"></i>
                    </span>
                    <input type="text" name="user_username" placeholder="Username"
                      style={{ width: 256, }}
                      value={this.state.user_username}
                      onChange={(e) => this.setState({ user_username: e.target.value})} />
                  </div>
                </div>
                <br />
                <div>
                  <div addontype="prepend" style={{ textAlign: "right" }}>
                    <span style={{ width: 32, display: "inline-block", textAlign: "center" }}>
                      <i className="fa fa-lock"></i>
                    </span>
                    <input type="password" name="user_password" placeholder="Password"
                      style={{ width: 256 }}
                      value={this.state.user_password}
                      onChange={(e) => this.setState({ user_password: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <div style={{ paddingTop: 16, display: 'flex', justifyContent: "flex-end" }} >
                    <button id="login_btn" name="login_btn"
                      className="btn btn-info"
                      style={{ backgroundColor: 'red' }}
                      onClick={this.handleSubmit.bind(this)}
                    >ลงชื่อเข้าใช้</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;

