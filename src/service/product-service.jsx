import MUtil from 'util/mm.jsx'

const _mm = new MUtil()

class Product {
  getProductList(listPrama) {
    let url = '',
        data = {}
    if(listPrama.listType === 'list') {
      url = '/manage/product/list.do'
      data.pageNum = listPrama.pageNum
    } else if(listPrama.listType === 'search') {
      url = '/manage/product/search.do'
      data.pageNum = listPrama.pageNum
      data[listPrama.searchType] = listPrama.searchKeyword
    }
    return _mm.request({
      type: 'post',
      url: url,
      data: data
    })
  }
  getProduct(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/detail.do',
      data: {
        productId: id || 0
      }
    })
  }
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: productInfo
    })
  }
  // 验证表单数据
  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    }
    if(typeof product.name !== 'string' || product.name.length === 0) {
      return {
        status: false,
        msg: '商品名称不能为空'
      }
    }
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
      return {
        status: false,
        msg: '商品描述不能为空'
      }
    }
    if(typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '请输入正确的商品价格'
      }
    }
    if(typeof product.stock !== 'number' || !(product.stock > 0)) {
      return {
        status: false,
        msg: '请输入正确的库存数量'
      }
    }
    if(typeof product.categoryId !== 'number' || !(product.categoryId >= 0)) {
      return {
        status: false,
        msg: '请选择正确的品类'
      }
    }
    return result
  }
  //保存商品
  saveProduct(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/save.do',
      data: productInfo
    })
  }
  /*
  * 品类相关
  */
  getCategoryList(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: id || 0
      }
    })
  }
}

export default Product