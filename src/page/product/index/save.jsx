import React from 'react'

import PageTitle from 'component/page-title/index.jsx'
import FileUploader from 'util/file-upload/index.jsx'
import RichEditor from 'util/rich-editor/index.jsx'
import CategorySelector from './category-selector.jsx'

import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
const _product = new Product()

import './save.scss'

class ProductSave extends React.Component{
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
        res.defaultDetail = res.detail
        this.setState(res)
      }, errMsg => _mm.errorTips(errMsg))
    }
  }
  onValueChange(e) {
    let value = e.target.value.trim(),
        name = e.target.name
    this.setState({
      [name]: value
    })
  }
  // 选中的品类Id
  onCategoryChange(id, parentId) {
    this.setState({
      categoryId: id,
      parentCategoryId: parentId
    })
  }
  // 上传图片成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages
    subImages.push(res)
    this.setState({
      subImages: subImages
    })
  }
  // 上传图片失败
  onUploadError(errMsg) {
    _mm.errorTips(errMsg)
  }
  // 删除图片
  onImageDelete(e) {
    let index = parseInt(e.target.getAttribute('index')),
        subImages = this.state.subImages
    subImages.splice(index ,1)
    this.setState({
      subImages: subImages
    })
  }
  // 富文本编辑器
  onDetailValueChange(value) {
    this.setState({
      detail: value
    })
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
      console.log(product)
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
              <input 
                type="text"
                name="name"
                className="form-control"
                value={this.state.name} 
                placeholder="请输入商品名称"
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input 
                type="text"
                name="subtitle"
                value={this.state.subtitle}
                className="form-control" 
                placeholder="请输入商品描述"
                onChange={e => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector 
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(id, parentId) => this.onCategoryChange(id, parentId)} />
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
                  placeholder="请输入商品价格"
                  onChange={e => this.onValueChange(e)}
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
                  placeholder="请输入商品库存"
                  onChange={e => this.onValueChange(e)}
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
                      <i className="fa fa-close" index={index} onClick={e => this.onImageDelete(e)}></i>
                    </div>
                  )) : (<div>请上传图片</div>)
              }
            </div>
            <div className="col-md-10 col-md-offset-2 file-upload-con">
              <FileUploader 
                onSuccess={(res) => this.onUploadSuccess(res)}
                onError={errMsg => this.onUploadError(errMsg)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor
                detail={this.state.detail}
                defaultDetail={this.state.defaultDetail}
                onValueChange={value => this.onDetailValueChange(value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSave