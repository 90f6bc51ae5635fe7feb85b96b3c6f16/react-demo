import React from 'react'
import { Link } from 'react-router-dom'
class MenuLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _LOGIN_TOKEN: [],
      access_menu: {
        master_data: [],
        production: [],
      },
    }
  }

  async componentDidMount() {
    const access_menu = await this._generateAccessMenu()

    this.setState({
      _LOGIN_TOKEN: this.props._LOGIN_TOKEN ? this.props._LOGIN_TOKEN : [],
      access_menu: access_menu,
    })
  }

  async componentDidUpdate(oldProps) {
    if (this.props.location.pathname !== oldProps.location.pathname) {
      const access_menu = await this._generateAccessMenu()

      this.setState({
        access_menu: access_menu,
      })
    }
  }

  _checkActiveMenu(url) {
    return `#${this.props.location.pathname}/`.search(`#${url}/`) >= 0 ? 'active' : ''
  }

  async _generateAccessMenu() {
    const access_menu = {
      master_data: [],
      production: [],
    }
    access_menu.master_data.push({
      name: 'พนักงาน',
      url: '/user',
      icon: 'fa fa-id-card-o',
    })
    access_menu.master_data.push({
      name: 'ลูกค้า',
      url: '/customer',
      icon: 'fa fa-user-circle-o',
    })

    return access_menu
  }

  render() {
    const { access_menu } = this.state

    return (
      <div id="sidebar-wrapper">
        <div className="sidebar-manu-top">
          <div className="sidebar-manu-top-text">
            <div style={{ fontSize: '1.2rem' }}>ERP</div>
            <div>Enterprise Resource Planning</div>
          </div>
        </div>
        <div className="list-group list-group-flush">
          <div className="scrollbar-container">
            {access_menu.production && access_menu.production.length ? <div className="sidebar-title-list">การผลิต</div> : null}
            {access_menu.production.map((item, idx) => (
              <Link key={idx} to={item.url} className={`sidebar-list ${this._checkActiveMenu(item.url)}`}>
                <i className={item.icon}></i> {item.name}
                {item.badge !== undefined && item.badge.text !== '' ? <span className={`badge badge-pill badge-${item.badge.variant}`}>{item.badge.text}</span> : null}
              </Link>
            ))}
            {access_menu.master_data && access_menu.master_data.length ? <div className="sidebar-title-list">Master Data</div> : null}
            {access_menu.master_data.map((item, idx) => (
              <Link key={idx} to={item.url} className={`sidebar-list ${this._checkActiveMenu(item.url)}`}>
                <i className={item.icon}></i> {item.name}
                {item.badge !== undefined && item.badge.text !== '' ? <span className={`badge badge-pill badge-${item.badge.variant}`}>{item.badge.text}</span> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MenuLayout