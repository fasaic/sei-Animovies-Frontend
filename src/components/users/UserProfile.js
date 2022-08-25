import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel'
import { getToken } from '../../auth/auth.js'

const UserProfile = () => {
  // const userId = console.log('user')
  // const { userId } = useParams()
  const [name, setName] = useState('')
  const [profile, setProfile] = useState({})
  const [comments, setComments] = useState({})
  const [movieName, setMovieName] = useState({})

  const [userName, setUserName] = ''
  const [password, setPassword] = ''
  const [confirmPassword, setConfirmPassword] = ''
  const [favourites, setFavourites] = useState([])

  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setProfile(data)
        setComments(data.comments)
        console.log(data.comments)
        // setMovieName(data.comments.movieNam)
        // setName(data.name)
        // setUserName(data.userName)
        // setFavourites(data.favouriteMovieGenre)
        // // These needs fixing because it won't work as password is hashed
        // setPassword(data.password)
        // setConfirmPassword(data.confirmPassword)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])
  console.log('comment->', comments)
  return (
    <Container className="profile-wrapper mb-5 min-vh-100">
      <Row className="about-wrapper align-items-center flex-row-reverse">
        <Col className="col-lg-6">
          <h3 className="dark-color">{profile.userName}'s PROFILE</h3>
          <Row className="about-list">
            <Col className="col">
              <div className="media">
                <label>Username</label>
                <p>{profile.userName}</p>
              </div>
              <div className="media">
                <label>E-mail</label>
                <p>{profile.email}</p>
              </div>
            </Col>
          </Row>

        </Col>
        <Col className="col-lg-6 mt-md-0 mt-4">
          {/* <div className="about-avatar"> */}
          <img
            className="profile-avatar"
            src="https://i.pinimg.com/474x/ab/7f/8b/ab7f8b18534abf0842b01d8ec37f4f71--funny-shit-funny-stuff.jpg"
            title=""
            alt=""
          />
          {/* </div> */}
        </Col>
      </Row>
      {/* <div className="counter"> */}
      <div className="row">
        {/* <div className="col"> */}
        <div className="count-data text-center">
          <h6 className="count h2  mt-4" data-to="150" data-speed="150">
            Previous Comments
          </h6>
          <Accordion defaultActiveKey="0">
            {comments.length > 0 ?
              <>
                {comments.map((comment, index) => {
                  index += 0
                  console.log(comment.moviePoster)
                  return (
                    <Accordion.Item eventKey={index} key={comment._id}>
                      <Accordion.Header>
                        {/* <img className='header-img' src={comment.moviePoster} alt="poster" /> */}
                        <h6>{comment.movieName}</h6>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="poster">
                          <img src={comment.moviePoster} alt="poster" />
                        </div>
                        {comment.text}
                      </Accordion.Body>
                    </Accordion.Item>
                  )
                })
                }
              </>
              :
              <h3>
                {error ? 'no comments' : 'loading'}
              </h3>

            }
          </Accordion>
        </div>
        {/* </div> */}
      </div>
      {/* </div> */}


    </Container>
  )
}

export default UserProfile
