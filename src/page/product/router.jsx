import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'

//页面
import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'

class ProductRouter extends React.Component{
  render() {
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Route path="/product/save" component={ProductSave} />
        <Redirect exact from="/product" to="/product/index" />
      </Switch>
    )
  }
}

export default ProductRouter