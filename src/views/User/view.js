import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import swal from 'sweetalert2';
import { Loading, Table } from '../../component/revel-strap'

import UserModel from '../../models/UserModel';
const user_model = new UserModel();

class UserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_list: [],
      loading: true,
    };
  }
  componentDidMount() {
    this._fetchData()
  }
  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState({
      loading: true,
    }, async () => {
      const user_list = await user_model.getUserBy({
        params: params,
      })
      this.setState({
        loading: false,
        user_list: user_list,
      })
    })
  }
  _onDelete(row) {
    swal.fire({
      title: "Are you sure ?",
      text: "Are you sure delete this item name : " + row.user_name + " ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({
          loading: true,
        }, async () => {
          user_model.deleteUserByID({ user_id: row.user_id }).then(res => {
            if (res.query_result) {
              swal.fire('Success Deleted!', '', 'success')
              this._fetchData()
            } else {
              this.setState({ showloading: false })
              swal.fire('Sorry, Someting worng !', '', 'error')
            }
          })
        })
      }
    })
  }

  render() {
    return (
      <div className="first-view">
        <Loading showLoading={this.state.loading} />
        <div className="div-topic">
          <h2>จัดการพนักงาน</h2>
        </div>
        <div className="card-topic">
          <div style={{ flexGrow: 1 }}>
            <label style={{ fontSize: '1.3rem' }}>รายการพนักงาน</label>
          </div>
          <div>
            <NavLink exact to={`/user/insert/`} style={{ width: '100%' }}>
              <button className="btn btn-success"><i className="fa fa-plus"></i> เพิ่ม</button>
            </NavLink>
          </div>
        </div>
        <div className="card-detail">
          <div className="scrollmenu">
            <Table
              showRowNo={true}
              dataSource={this.state.user_list.data}
              dataTotal={this.state.user_list.total}
              rowKey='user_id'
              columns={[
                {
                  title: 'ชื่อย่อ',
                  dataIndex: 'user_prename',
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: 'ชื่อ',
                  dataIndex: 'user_name',
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: 'สกุล',
                  dataIndex: 'user_lastname',
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: '#',
                  dataIndex: '',
                  render: (cell) => {
                    return (
                      <div>
                        <Link key="update" to={`/user/update/${cell.user_id}`} title="แก้ไขรายการ" style={{ color: '#337ab7', }}>
                          <button type="button" className="btn btn-primary btn-row-sm">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                          </button>
                        </Link>
                        <button key="delete" type="button" className="btn btn-danger btn-row-sm" onClick={() => this._onDelete(cell)} title="ลบรายการ">
                          <i className="fa fa-remove" aria-hidden="true"></i>
                        </button>
                      </div>
                    )
                  },
                  width: 120,
                }]
              }
            />
          </div>
        </div>
      </div>
    )
  }

}


export default (UserView);

