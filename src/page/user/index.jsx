import React from 'react'
import{ Link } from 'react-router-dom'
import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _user = new User()

import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: []
    }
  }
  componentDidMount() {
    this.loadUserList()
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      }) 
      _mm.errorTips(errMsg)})
  }
  onPageNumChange(pageNum) {
    // 异步
    this.setState({
      pageNum: pageNum
    }, () => this.loadUserList())
  }
  render() {
    let tableHeaders = ['ID', '用户名', '邮箱', '电话', '注册时间']
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <TableList tableHeaders={tableHeaders}>
              {
                  this.state.list.map((user, index) => {
                    return (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(user.createTime).toLocaleString()}</td>
                      </tr>
                    )
                  })
              }
        </TableList>
        <Pagination 
          current={this.state.pageNum} 
          total={this.state.total}
          onChange={pageNum => this.onPageNumChange(pageNum)}
        />
      </div>
    )
  }
}

export default UserList