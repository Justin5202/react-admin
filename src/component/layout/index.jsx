import React from 'react'
import ReactDOM from 'react-dom'

import NavTop from 'component/top-nav/index.jsx'
import NavSide from 'component/side-nav/index.jsx'

import './theme.css'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="wrapper">
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    )
  }
}

export default Layout