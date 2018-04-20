import React from 'react'

class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirstLoading: true
    }
  }
  componentWillReceiveProps() {
    // 第一次挂载为true
    this.setState({
      isFirstLoading: false
    })
  }
  render() {
    // 表头
    let tableHeader = this.props.tableHeaders.map((v, index) => {
      if(typeof v === 'object') {
        return (
          <th key={index} width={v.width}>{v.name}</th>
        )
      } else if(typeof v === 'string') {
        return (
          <th key={index}>{v}</th>
        )
      }
    })
    // 列表内容
    let listBody = this.props.children 
    let listError = (
      <tr>
        <td colSpan={this.props.tableHeaders.length} className="text-center">
          {this.state.isFirstLoading ? '正在加载...' : '没有找到相应的结果'}
        </td>
      </tr>
    )
    let tableBody = listBody.length > 0 ? listBody : listError
    return (
      <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {tableHeader}
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default TableList