import React from 'react'
import { DatePicker } from "antd"
import moment from 'moment'

export default class RevelDatePicker extends React.Component {

  disabledDate(current) {
    const { minDate, maxDate } = this.props

    if (minDate !== undefined && maxDate !== undefined) {
      return current && (current > moment(maxDate).clone() || current < moment(minDate).clone())
    } else if (minDate !== undefined) {
      return current && current < moment(minDate).clone()
    } else if (maxDate) {
      return current && current > moment(maxDate).clone()
    }
  }

  _onChangeDate(e) {
    if (this.props.onChange !== undefined) {
      if (e !== null) {
        this.props.onChange(e._d)
      } else {
        this.props.onChange('')
      }
    }
  }

  render() {
    let { setProps } = this.props
    return (
      <DatePicker
        className={(this.props.className || 'form-control')}
        value={(this.props.value === '' || this.props.value === undefined) ? '' : moment(this.props.value, "YYYY/MM/DD")}
        format={(this.props.format || "DD/MM/YYYY")}
        allowClear={(this.props.allowClear || false)}
        onChange={(e) => this._onChangeDate(e)}
        disabledDate={(e) => this.disabledDate(e)}
        style={this.props.style || {}}
        showTime={this.props.showTime === undefined ? false : true}
        {...setProps}
      />
    )
  }
}