import React from 'react'
import { Table, Input, } from "antd"

export default class RevelTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: 20,
      },
      filters: {},
    }
  }

  componentDidMount() {
    const { pageSize, } = this.props

    this.setState(state => {
      state.pagination.pageSize = pageSize || 20

      return { pagination: state.pagination }
    })
  }

  _onChangeTable(pagination, filters, sorter) {
    this.setState({
      pagination: pagination,
      filters: filters,
    }, () => {
      const { filters } = this.state
      let props_filters = {}

      this.props.columns.forEach(item => {
        if (filters[item.dataIndex] !== undefined && filters[item.dataIndex] !== null) {
          if (item.filterAble && filters[item.dataIndex].length) {
            props_filters[item.dataIndex] = filters[item.dataIndex][0]
          } else {
            props_filters[item.dataIndex] = filters[item.dataIndex]
          }
        }
      })

      if (this.props.onChange !== undefined) {
        this.props.onChange({
          pagination: this.state.pagination,
          filters: props_filters,
          sorter: sorter,
        })
      }
    })
  }

  _setColumnsProps() {
    const { filters, pagination } = this.state

    var { columns, showRowNo } = this.props

    for (let i in columns) {
      if (columns[i].filterAble) {
        columns[i] = Object.assign(columns[i], {
          filteredValue: filters[columns[i].dataIndex],
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 6 }}>
              <Input
                ref={(node) => { this.searchInput = node }}
                placeholder="Search"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ width: 'unset', display: "inline-block" }}
              />
              <button type="button" className="btn btn-primary btn-sm" style={{ height: 32, marginRight: 0, verticalAlign: "top", }} onClick={() => confirm()}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
              <button type="button" className="btn btn-default btn-sm" style={{ height: 32, marginRight: 0, verticalAlign: "top", }} onClick={() => clearFilters()}>
                <i className="fa fa-undo" aria-hidden="true"></i>
              </button>
            </div>
          ),
          filterIcon: (filtered) => (<i className="ant-table-filter-trigger-icon fa fa-search" aria-hidden="true" style={{ color: filtered ? "#1890ff" : undefined, }} />),
          onFilter: (value, record) => record[columns[i].dataIndex] ? record[columns[i].dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
          onFilterDropdownVisibleChange: visible => {
            if (visible) setTimeout(() => this.searchInput.select(), 100)
          },
        })
      } else if (columns[i].filters !== undefined && columns[i].filters.length) {
        columns[i] = Object.assign(columns[i], {
          filteredValue: filters[columns[i].dataIndex] || null,
          onFilter: (value, record) => {
            if (record[columns[i].dataIndex]) return record[columns[i].dataIndex].includes(value)
          },
        })
      }
    }

    if (showRowNo) {
      return [
        {
          title: "No.",
          render: (cell, row, index) => (((pagination.current - 1) * pagination.pageSize) + index + 1),
          width: 48,
          align: 'center',
        }, ...columns
      ]
    } else {
      return columns
    }
  }

  render() {
    let { setProps } = this.props

    return (
      <div style={{ overflow: 'auto', }}>
        <Table
          size={this.props.size || 'small'}
          loading={this.props.loading || false}
          bordered={this.props.bordered || true}
          dataSource={this.props.dataSource || []}
          pagination={(this.props.pagination === false ? false : { ...this.state.pagination, total: this.props.dataTotal })}
          rowKey={(row) => row[this.props.rowKey]}
          columns={this._setColumnsProps()}
          onChange={(pagination, filters, sorter) => this._onChangeTable(pagination, filters, sorter)}
          style={this.props.style || { minWidth: 600, }}
          {...setProps}
        />
      </div>
    )
  }
}