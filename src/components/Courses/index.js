import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseList} = props

  const {logoUrl, name, id} = courseList

  return (
    <Link to={`/courses/${id}`}>
      <li className="list-item">
        <img src={logoUrl} className="logo-image" alt={name} />
        <h1 className="course-name1">{name}</h1>
      </li>
    </Link>
  )
}

export default Courses
