import React from 'react'

class PageTitle extends React.Component {
  componentWillMount() {
    document.title = this.props.title + '- HAPPYMMALL'
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
        </div>
      </div>
    )
  }
}

export default PageTitle