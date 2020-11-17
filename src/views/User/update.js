import React, { Component } from 'react';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Loading, Select } from '../../component/revel-strap'
import UserTypeModel from '../../models/UserTypeModel';
import FarmModel from '../../models/FarmModel';
import UserModel from '../../models/UserModel';
const user_type_model = new UserTypeModel();
const farm_model = new FarmModel();
const user_model = new UserModel();
class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_types: [],
      frams: [],
      user_prename: '',
      user_name: '',
      user_lastname: '',
      user_username: '',
      user_password: '',
      user_type_id: '',
      user_active: '0',
      farm_id: '',
      username_validate: {
        value: '',
        status: '',
        class: '',
        text: '',
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
      const { user_id } = this.props.match.params
      const users = await user_model.getUserByID({ user_id: user_id });
      if (users.require === false) {
        swal.fire("ข้อผิดพลาดไม่สามารถโหลดข้อมูล !", '', 'error')
        this.props.history.push('/user')
      } else if (users.data.length === 0) {
        swal.fire("ไม่พบรายการนี้ในระบบ !", '', 'warning')
        this.props.history.push('/user')
      } else {
        const user_types = await user_type_model.getUserTypeBy();
        const frams = await farm_model.getFarmBy();
        const {
          user_prename,
          user_name,
          user_lastname,
          user_username,
          user_password,
          user_type_id,
          user_active,
          farm_id
        } = users.data[0]
        this.setState({
          user_id: user_id,
          username_validate: { value: user_username, status: 'VALID', class: '', text: '', },
          user_types: user_types.data,
          frams: frams.data,
          user_prename: user_prename,
          user_name: user_name,
          user_lastname: user_lastname,
          user_username: user_username,
          user_password: user_password,
          user_type_id: user_type_id,
          user_active: user_active,
          farm_id: farm_id,
          loading: false
        })
      }
    })
  }
  async _submitForm() {
    if (this._checkSubmit()) {
      this.setState({
        loading: true,
      })
      const user = await user_model.updateUser({
        user_id: this.state.user_id,
        user_prename: this.state.user_prename,
        user_name: this.state.user_name,
        user_lastname: this.state.user_lastname,
        user_username: this.state.user_username,
        user_password: this.state.user_password,
        user_type_id: this.state.user_type_id,
        user_active: this.state.user_active,
        farm_id: this.state.farm_id,
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
    }else if (this.state.user_prename === '') {
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
    } else if (this.state.user_type_id === '') {
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
    } else if (this.state.farm_id === '') {
      swal.fire({
        title: "Warning!",
        text: "Please Enter Your Farm ",
        icon: "warning",
        button: "Close",
      });
    } else {
      return true
    }
  }
  async _checkUsername() {
    const username = this.state.user_username.trim()
    const user_id = this.state.user_id
    if (this.state.username_validate.value !== username) {
      if (username.length === 0) {
        this.setState({ username_validate: { value: username, status: 'INVALID', class: '', text: 'Please input Username', } })
      } else if (username.length < 5 || username.length > 20) {
        this.setState({ username_validate: { value: username, status: 'INVALID', class: 'is-invalid', text: 'Username should be 5-20 characters', } })
      } else {
        const user = await user_model.checkUsernameBy({ user_username: username, user_id: user_id })

        if (user.data.length) {
          this.setState({ username_validate: { value: username, status: 'INVALID', class: 'is-invalid', text: 'This code already exists.', } })
        } else {
          this.setState({ username_validate: { value: username, status: 'VALID', class: 'is-valid', text: '', } })
        }
      }
    }
  }
  render() {
    const user_types = [{ label: '- ไม่ระบุ -', value: '' }, ...this.state.user_types.map((item, idx) => ({
      index: idx, label: item.user_type_name, value: item.user_type_id,
    }))]
    const frams = [{ label: '- ไม่ระบุ -', value: '' }, ...this.state.frams.map((item, idx) => ({
      index: idx, label: item.farm_name_en, value: item.farm_id,
    }))]
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
            <div className="col-lg-4">
              <label>คำนำหน้าชื่อ<font color="#F00"><b> *</b></font></label>
              <input type="text" className="form-control" id="user_prename"
                value={this.state.user_prename}
                onChange={(e) => this.setState({ user_prename: e.target.value })}
              />
            </div>
            <div className="col-lg-4">
              <label>ชื่อ<font color="#F00"><b> *</b></font></label>
              <input type="text" className="form-control" id="user_name"
                value={this.state.user_name}
                onChange={(e) => this.setState({ user_name: e.target.value })} />
            </div>
            <div className="col-lg-4">
              <label>นามสกุล <font color="#F00"><b> *</b></font> </label>
              <input type="text" className="form-control" id="user_lastname"
                value={this.state.user_lastname}
                onChange={(e) => this.setState({ user_lastname: e.target.value })} />
            </div>
          </div>
          <div className="row row-contenct">
            <div className="col-lg-4">
              <label>ยูสเซอร์<font color="#F00"><b> *</b></font> </label>
              <input type="text" id="user_username"
                className={`form-control ${this.state.username_validate.class}`}
                value={this.state.user_username}
                onChange={(e) => this.setState({ user_username: e.target.value })}
                onBlur={() => this._checkUsername()}
              />
            </div>
            <div className="col-lg-4">
              <label>รหัสผ่าน<font color="#F00"><b> *</b></font></label>
              <input type="password" className="form-control" id="user_password"
                value={this.state.user_password}
                onChange={(e) => this.setState({ user_password: e.target.value })} />
            </div>
          </div>

          <div className="row row-contenct">
            <div className="col-lg-4">
              <label>สิทธิ์การใช้งาน<font color="#F00"><b> *</b></font></label>
              <Select
                options={user_types}
                value={this.state.user_type_id}
                onChange={(e) => this.setState({ user_type_id: e })}
              />
            </div>
            <div className="col-lg-4">
              <label>ฟาร์ม<font color="#F00"><b> *</b></font></label>
              <Select
                options={frams}
                value={this.state.farm_id}
                onChange={(e) => this.setState({ farm_id: e })}
              />
            </div>
            <div className="col-lg-4">
              <label>สถานะของผู้ใช้<font color="#F00"><b> *</b></font></label>
              <Select
                options={user_active}
                value={this.state.user_active}
                onChange={(e) => this.setState({ user_active: e })}
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
      </div>
    )
  }
}

export default (Update);

