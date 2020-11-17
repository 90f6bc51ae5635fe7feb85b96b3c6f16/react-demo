import React from 'react'
class FooterLayout extends React.Component {
  render() {
    const { children, ...attributes } = this.props
    return (
      <div className="footer-fluid">
        <React.Fragment>
          <span className="ml-auto">Powered by <a target='_blank' rel="noopener" href="http://www.revelsoft.co.th/">Revel Soft Co.,Ltd</a></span>
        </React.Fragment>
      </div>
    )
  }
}
export default FooterLayout