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
  setProductStatus(productInfo) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
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