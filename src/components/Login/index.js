import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isAuthenticateFail: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulAuthentication = token => {
    Cookies.set('jwt_token', token, {expires: 30})

    const {history} = this.props

    history.replace('/')
  }

  onFailureAuthentication = error => {
    this.setState({errorMsg: error, isAuthenticateFail: true})
  }

  onSubmitUserCredentials = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccessfulAuthentication(data.jwt_token)
    } else {
      this.onFailureAuthentication(data.error_msg)
    }
  }

  render() {
    const {username, password, isAuthenticateFail, errorMsg} = this.state

    return (
      <div className="book-hub-login-container">
        <img
          src="https://res.cloudinary.com/di8upujpz/image/upload/v1674112517/Rectangle_1467_quyh8p.png"
          className="login-banner-image"
        />
        <div className="login-home-container">
          <div className="login-bookhub-title-images-container">
            <img
              className="book-hub-login-banner-image"
              src="https://res.cloudinary.com/di8upujpz/image/upload/v1674034978/Ellipse_99_jmxmhp.png"
            />
            <img
              src="https://res.cloudinary.com/di8upujpz/image/upload/v1674035023/Group_7732_lk7a9q.png"
              className="bookhub-logo-image"
            />
          </div>

          <div className="login-credentials-container">
            <form
              onSubmit={this.onSubmitUserCredentials}
              className="form-container"
            >
              <div className="input-container">
                <label htmlFor="username" className="input-label-text">
                  Username*
                </label>
                <input
                  value={username}
                  onChange={this.onChangeUsername}
                  id="username"
                  type="text"
                  className="input"
                />
              </div>

              <div className="input-container">
                <label htmlFor="password" className="input-label-text">
                  Password*
                </label>
                <input
                  value={password}
                  onChange={this.onChangePassword}
                  id="password"
                  type="password"
                  className="input"
                />
              </div>
              {isAuthenticateFail && <p className="error-text">{errorMsg} </p>}

              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
