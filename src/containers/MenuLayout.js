import React from 'react';
import { Link } from 'react-router-dom';
class MenuLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggled: true,
      active_manu: '',
    }
  }
  async componentDidMount() {
    this.setState({
      active_manu: this.props.location.pathname
    })
  }
  async componentDidUpdate(props_old) {
    if (this.props.location.pathname !== props_old.location.pathname) {
      this.setState({
        active_manu: this.props.location.pathname 
      })
    }
  }
  render() {
    return (
      <div className="list-group list-group-flush">
        <div className="scrollbar-container">
          <div style={{ backgroundColor: '#66c009', color: '#fff', padding: 16, height: 50 }}>Master Data</div>
          <div className="sidebar-manu-lsit">
            <Link to="/user" className={"list-group-item list-group-item-action  sidebar-list" + (this.state.active_manu.search('/user') === 0 ? ' active' : '')}>
              <i className="fa fa-user-circle-o"></i>
              <label className="sidebar-manu-lsit-text"> พนักงาน </label>
            </Link>
            <Link to="/customer" className={"list-group-item list-group-item-action  sidebar-list" + (this.state.active_manu.search('/customer') === 0 ? ' active' : '')}>
              <i className="fa fa-users"></i>
              <label className="sidebar-manu-lsit-text"> ลูกค้า </label>
            </Link>
          </div>
        </div>
      </div>

    );
  }
}



export default MenuLayout;

