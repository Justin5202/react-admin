import React from 'react'
import { Link, NavLink } from 'react-router-dom'

class NavSide extends React.Component {
  render() {
    return (
      <nav className="navbar-default navbar-side" role="navigation"> 
        <div className="sidebar-collapse"> 
          <ul className="nav">
            <li>
              <NavLink exact activeClassName="active-menu" to="/">
                <i></i>
                <span>首页</span>
              </NavLink>
            </li>
            <li className="active"> 
              <Link to="/product">
                <i className="fa fa-sitemap"></i> 
                <span>商品</span>
                <span className="fa arrow"></span>
              </Link> 
              <ul className="nav nav-second-level collapse in"> 
                <li> <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink> </li> 
                <li> <NavLink to="/product-catetory" activeClassName="active-menu">品类管理</NavLink> </li>
              </ul> 
            </li>
            <li className="active"> 
              <Link to="/order">
                <i className="fa fa-sitemap"></i> 
                <span>订单管理</span>
                <span className="fa arrow"></span>
              </Link> 
              <ul className="nav nav-second-level collapse in"> 
                <li> <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink> </li>
              </ul> 
            </li>
            <li className="active"> 
              <Link to="/user">
                <i className="fa fa-sitemap"></i> 
                <span>用户管理</span>
                <span className="fa arrow"></span>
              </Link> 
              <ul className="nav nav-second-level collapse in"> 
                <li> <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink> </li>
              </ul> 
            </li>
          </ul> 
        </div> 
      </nav>
    )
  }
}

export default NavSide