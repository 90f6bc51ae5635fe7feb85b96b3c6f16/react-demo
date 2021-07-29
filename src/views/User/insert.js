import React, { Component } from 'react';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import GLOBAL from '../../GLOBAL'
import { Loading, Select } from '../../component/revel-strap'

import UserTypeModel from '../../models/UserTypeModel';
import UserModel from '../../models/UserModel';
import { FileService } from "../../utility";
const user_type_model = new UserTypeModel();
const user_model = new UserModel();
const file_service = new FileService();
class Insert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_types: [],
      user_code: '',
      user_prename: '',
      user_name: '',
      user_lastname: '',
      user_username: '',
      user_password: '',
      user_type_code: '',
      user_active: '0',
      username_validate: {
        value: '',
        status: 'INVALID',
        class: '',
        text: 'Please input Username',
      },
      user_image: {
        src: GLOBAL.BASE_URL.URL + "user-default.png",
        file: null,
        old: "",
      },
      loading: true,
    };
  }

  componentDidMount() {
    this._fetchData()
  }
  _fetchData() {
    this.setState({
      loading: true,
    }, async () => {
      const date = new Date();
      const last_code = await user_model.getUserLastCode({
        code: "US" + date.getFullYear(),
        digit: 4,
      });
      const user_types = await user_type_model.getUserTypeBy();
      this.setState({
        loading: false,
        user_code: last_code.data,
        user_types: user_types.data,
      })
    })
  }
  async _submitForm() {
    if (this._checkSubmit()) {
      this.setState({
        loading: true,
      })
      const user = await user_model.insertUser({
        user_code: this.state.user_code,
        user_prename: this.state.user_prename,
        user_name: this.state.user_name,
        user_lastname: this.state.user_lastname,
        user_username: this.state.user_username,
        user_password: this.state.user_password,
        user_type_code: this.state.user_type_code,
        user_active: this.state.user_active,
        user_image: await file_service.updateFile({ src: this.state.user_image, upload_path: "users/", }),
      });
      if (user.query_result === true) {
        this.setState({
          loading: false,
        })
        swal.fire({ title: "Good job!", text: "Save Success", icon: "success", })
        this.props.history.push('/user');
      } else {
        this.setState({
          loading: false,
        })
        swal.fire({ title: "Error !", text: "Add Error ", icon: "error", })
      }
    }
  }
  _checkSubmit() {
    if (this.state.username_validate.status !== "VALID") {
      swal.fire(this.state.username_validate.text)
      return false
    } else if (this.state.user_prename === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Prename ",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_name === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Name ",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_lastname === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Lastname  ",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_username === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Username",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_password === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Password",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_type_code === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Type",
        icon: "warning",
        button: "Close",
      });
    } else if (this.state.user_active === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Active",
        icon: "warning",
        button: "Close",
      });
    } else {
      return true
    }
  }
  async _checkUsername() {
    const username = this.state.user_username.trim()
    if (this.state.username_validate.value !== username) {
      if (username.length === 0) {
        this.setState({ username_validate: { value: username, status: 'INVALID', class: '', text: 'Please input Username', } })
      } else if (username.length < 5 || username.length > 20) {
        this.setState({ username_validate: { value: username, status: 'INVALID', class: 'is-invalid', text: 'Username should be 5-20 characters', } })
      } else {
        const user = await user_model.checkUsernameBy({ user_username: username })

        if (user.data.length) {
          this.setState({ username_validate: { value: username, status: 'INVALID', class: 'is-invalid', text: 'This code already exists.', } })
        } else {
          this.setState({ username_validate: { value: username, status: 'VALID', class: 'is-valid', text: '', } })
        }
      }
    }
  }

  _handleImageChange(img_name, e) {
    if (e.target.files.length) {
      let file = new File([e.target.files[0]], e.target.files[0].name, { type: e.target.files[0].type, });
      if (file !== undefined) {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState((state) => {
            if (img_name === "user_image") {
              return {
                user_image: {
                  src: reader.result,
                  file: file,
                  old: state.user_image.old,
                },
              };
            }
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }
  render() {
    const user_types = [{ label: '- ไม่ระบุ -', value: '' },
    ...this.state.user_types.map((item, idx) => ({
      index: idx, label: item.user_type_name, value: item.user_type_code,
    }))
    ]
    const user_active = [
      { label: 'ทำงาน', value: '0', },
      { label: 'ไม่ทำงาน', value: '1', },
    ]
    return (
      <div className="animated fadeIn">
        <Loading showLoading={this.state.loading} />
        <div className="div-topic">
          <h2>จัดการพนักงาน</h2>
        </div>
        <div className="card-topic">
          <div style={{ flexGrow: 1 }}>
            <label style={{ fontSize: '1.3rem' }}>เพิ่มข้อมูลพนักงาน</label>
          </div>
        </div>
        <div className="card-detail">
          <div className="row row-contenct">
            <div className="col-lg-3">
              <label>รหัสผู้ใช้งาน</label>
              <input type="text" className="form-control" id="user_code"
                value={this.state.user_code}
                readOnly
              />
            </div>
            <div className="col-lg-3">
              <label>คำนำหน้าชื่อ<font color="#F00"><b> *</b></font></label>
              <input type="text" className="form-control" id="user_prename"
                value={this.state.user_prename}
                onChange={(e) => this.setState({ user_prename: e.target.value })}
              />
            </div>
            <div className="col-lg-3">
              <label>ชื่อ<font color="#F00"><b> *</b></font></label>
              <input type="text" className="form-control" id="user_name"
                value={this.state.user_name}
                onChange={(e) => this.setState({ user_name: e.target.value })} />
            </div>
            <div className="col-lg-3">
              <label>นามสกุล <font color="#F00"><b> *</b></font> </label>
              <input type="text" className="form-control" id="user_lastname"
                value={this.state.user_lastname}
                onChange={(e) => this.setState({ user_lastname: e.target.value })} />
            </div>
          </div>
          <div className="row row-contenct">
            <div className="col-lg-8">
              <div className="row row-contenct">
                <div className="col-lg-6">
                  <label>ยูสเซอร์<font color="#F00"><b> * 5-20 ตัวอักษร</b></font> </label>
                  <input type="text" id="user_username"
                    className={`form-control ${this.state.username_validate.class}`}
                    value={this.state.user_username}
                    onChange={(e) => this.setState({ user_username: e.target.value })}
                    onBlur={() => this._checkUsername()}
                  />
                </div>
                <div className="col-lg-6">
                  <label>รหัสผ่าน<font color="#F00"><b> *</b></font></label>
                  <input type="password" className="form-control" id="user_password"
                    value={this.state.user_password}
                    onChange={(e) => this.setState({ user_password: e.target.value })} />
                </div>
              </div>
              <div className="row row-contenct">
                <div className="col-lg-6">
                  <label>สิทธิ์การใช้งาน<font color="#F00"><b> *</b></font></label>
                  <Select
                    options={user_types}
                    value={this.state.user_type_code}
                    onChange={(e) => this.setState({ user_type_code: e })}
                  />
                </div>
                <div className="col-lg-6">
                  <label>สถานะของผู้ใช้<font color="#F00"><b> *</b></font></label>
                  <Select
                    options={user_active}
                    value={this.state.user_active}
                    onChange={(e) => this.setState({ user_active: e })}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <label>โปรไฟล์<font color="#F00"><b> *</b></font></label>
              <div className="text-center">
                <img
                  className="image-upload"
                  style={{ maxWidth: 280 }}
                  src={this.state.user_image.src}
                  alt="profile"
                />
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="form-control"
                onChange={(e) => this._handleImageChange("user_image", e)}
              />
            </div>
          </div>
          <div className="row right">
            <div className="col">
              <button className="btn btn-success" style={{ margin: 8 }} onClick={() => this._submitForm()}>บันทึก</button>
              <Link to="/user"><button className="btn btn-danger" style={{ margin: 8 }}>ยกเลิก</button></Link>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default (Insert);

