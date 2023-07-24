import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const courseItemDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CoursesItemDetails extends Component {
  state = {
    courseDetailsList: [],
    apiStatus: courseItemDetailsConstants.initial,
  }

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: courseItemDetailsConstants.inProgress})

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: courseItemDetailsConstants.success,
      })
    } else {
      this.setState({apiStatus: courseItemDetailsConstants.failure})
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
      <button
        type="button"
        className="button"
        onClick={this.getCourseItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseDetailsList} = this.state
    console.log(courseDetailsList)
    const {description, imageUrl, name} = courseDetailsList
    return (
      <div className="success-details-container">
        <img src={imageUrl} className="details-image" alt={name} />
        <div className="middle-con">
          <h1 className="course-name">{name}</h1>
          <p className="paragraph">{description}</p>
        </div>
      </div>
    )
  }

  renderTheCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case courseItemDetailsConstants.success:
        return this.renderSuccessView()
      case courseItemDetailsConstants.failure:
        return this.renderFailureView()
      case courseItemDetailsConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-item-details">{this.renderTheCases()}</div>
      </>
    )
  }
}

export default CoursesItemDetails
