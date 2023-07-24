import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Courses from '../Courses'
import Header from '../Header'

const coursesConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: coursesConstants.initial,
  }

  componentDidMount() {
    this.getTheCourses()
  }

  getTheCourses = async () => {
    const url = 'https://apis.ccbp.in/te/courses'

    this.setState({apiStatus: coursesConstants.inProgress})

    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: coursesConstants.success,
      })
    } else {
      this.setState({apiStatus: coursesConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="button" onClick={this.getTheCourses()}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div>
        <h1 className="course-heading">Courses</h1>
        <ul className="unorder-list">
          {courseList.map(each => (
            <Courses courseList={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderTheCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case coursesConstants.success:
        return this.renderSuccessView()
      case coursesConstants.failure:
        return this.renderFailureView()
      case coursesConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.renderTheCases()}</div>
      </>
    )
  }
}

export default Home
