import React from 'react'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new Product()

import './category-selector.scss'

class CategorySelector extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }
  componentDidMount() {
    this.loadFristCategoryList()
  }
  // 加载一级分类
  loadFristCategoryList() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      })
    }, errMsg => _mm.errorTips(errMsg))
  }
  // 加载二级
  loadSecondCategoryList() {
    _product.getCategoryList(this.state.firstCategoryId).then(res => {
      this.setState({
        secondCategoryList: res
      })
    }, errMsg => _mm.errorTips(errMsg))
  }
  // 选择一级
  onFirstCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState({
      firstCategoryId: newValue,
      secondCategoryList: [],
      secondCategoryId: 0
    }, () => {
      this.loadSecondCategoryList()
      this.onPropsCategoryChange()
    })
  }
  // 选择二级
  onSecondCategoryChange(e) {
    let newValue = e.target.value || 0
    this.setState({
      secondCategoryId: newValue
    }, () => {
      this.onPropsCategoryChange()
    })
  }
  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断函数是否存在
    let categoryChangable = typeof this.props.onCategoryChange === 'function'
    // 选中二级
    if(this.state.secondCategoryId) {
      categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    } else {
      // 只有一级
      categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }
  render() {
    return (
      <div className="col-md-10">
        <select 
          className="form-control cate-select"
          onChange={e => this.onFirstCategoryChange(e)}
        >
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map(
              (v, index) => <option value={v.id} key={index}>{v.name}</option>
            )
          }
        </select>
        {this.state.secondCategoryList.length > 0 ? 
        (<select 
          className="form-control cate-select"
          onChange={e => this.onSecondCategoryChange(e)}
        >
          <option value="">请选择二级分类</option>
          {
            this.state.secondCategoryList.map(
              (v, index) => <option value={v.id} key={index}>{v.name}</option>
            )
          }
        </select>) : null }
      </div>
    )
  }
}

export default CategorySelector