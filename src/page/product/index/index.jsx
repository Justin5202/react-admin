import React from 'react'
import{ Link } from 'react-router-dom'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new Product()

import PageTitle from 'component/page-title/index.jsx'
import ListSearch from './index-list-search.jsx'
import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'

import './index.scss'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      list: [],
      listType: 'list'
    }
  }
  componentDidMount() {
    this.loadProductList()
  }
  loadProductList() {
    let listPrama = {}
    listPrama.listType = this.state.listType
    listPrama.pageNum = this.state.pageNum
    // 如果是搜索类型的话
    if(this.state.listType === 'search') {
      listPrama.searchType = this.state.searchType
      listPrama.searchKeyword = this.state.searchKeyword
    }
    _product.getProductList(listPrama).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: []
      }) 
      _mm.errorTips(errMsg)})
  }
  onSearch(type, keyword) {
    let listType = keyword === '' ? 'list' : 'search'
    this.setState({
      listType: listType,
      pageNum: 1,
      searchType: type,
      searchKeyword: keyword
    }, () => {
      this.loadProductList()
    })
  }
  onPageNumChange(pageNum) {
    // 异步
    this.setState({
      pageNum: pageNum
    }, () => this.loadProductList())
  }
  onSetProductStatus(e, id, status) {
    let newStatus = status === 1 ? 2 : 1,
        confirmTips = status === 1 
          ? '确定要下架该商品？' : '确定要上架该商品？'
    if(window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId: id,
        status: status
      }).then(res => {
        _mm.successTips(res)
        this.loadProductlist()
      }, errMsg => _mm.errorTips(errMsg))
    }
  }
  render() {
    let tableHeaders = [
      {name: '商品ID', width: '10%'},
      {name: '商品名称', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'}
    ]
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表" />
        <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加商品</span>
            </Link>
          </div>
        <ListSearch 
          onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)} />
        <TableList tableHeaders={tableHeaders}>
          {
            this.state.list.map((product, index) => {
              return (
                <tr>
                  <td>{product.id}</td>
                  <td>
                    <p>{product.name}</p>
                    <p>{product.subtitle}</p>
                  </td>
                  <td>￥{product.price}</td>
                  <td>
                    <p>{product.status === 1 ? '在售' : '已下架'}</p>
                    <button 
                      className="btn btn-xs btn-warning"
                      onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}>
                      {product.status === 1 ? '下架' : '上架'}
                    </button>
                  </td>
                  <td>
                    <Link className="opear" to={`/product/detail${product.id}`}>查看详情</Link>
                    <Link className="opear" to={`/product/save${product.id}`}>编辑</Link>
                  </td>
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

export default ProductList