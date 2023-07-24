import {withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  //   console.log(props)
  const {history} = props

  const onClickingLogo = () => {
    history.replace('/')
  }

  return (
    <div className="header-componet">
      <button onClick={onClickingLogo} className="button" type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="image-logo"
        />
      </button>
    </div>
  )
}

export default withRouter(Header)
