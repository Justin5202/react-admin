import React from 'react'

import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.jsx'

import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new Product()

import './save.scss'

class ProductDetail extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.pid,
      name: '',
      subtitle: '',
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      price: '',
      stock: '',
      detail: '',
      status: 1
    }
  }
  componentDidMount() {
    this.loadProduct()
  }
  // 是否是编辑商品
  loadProduct() {
    if(this.state.id) {
      _product.getProduct(this.state.id).then(res => {
        let images = res.subImages.split(',')
        res.subImages = images.map(v => {
          return {
            uri: v,
            url: res.imageHost + v
          }
        })
        this.setState(res)
      }, errMsg => _mm.errorTips(errMsg))
    }
  }
  getSubImages() {
    return this.state.subImages.map(v => v.url).join(',')
  }
  onSubmit(e) {
    let product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      subImages: this.getSubImages,
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      categoryId: parseInt(this.state.categoryId),
      status: this.state.status
    },
    productCheckResult = _product.checkProduct(product)
    if(this.state.id) {
      product.id = this.state.id
    }
    if(productCheckResult.status) {
      _product.saveProduct(product).then(res => {
        _mm.successTips(res)
        this.props.history.push('/product')
      }, errMsg => _mm.errorTips(errMsg))
    } else {
      _mm.errorTips(productCheckResult.msg)
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.name}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
            <p className="form-control-static">{this.state.subtitle}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector
              ReadOnly
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input 
                  type="num"
                  name="price"
                  value={this.state.price}
                  className="form-control"
                  readOnly
                />
                <span className="input-group-addon" id="basic-addon2">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input 
                  type="num"
                  name="stock"
                  value={this.state.stock}
                  className="form-control"
                  readOnly
                />
                <span className="input-group-addon" id="basic-addon2">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10 file-upload-con">
              {
                this.state.subImages.length > 0 ? this.state.subImages.map(
                  (v, index) => (
                    <div className="img-container" key={index}>
                      <img src={v.url} />
                    </div>
                  )) : (<div>暂无图片</div>)
              }
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail