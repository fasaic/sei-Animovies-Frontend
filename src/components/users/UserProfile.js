import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel'
import { getToken } from '../../auth/auth.js'
import { API_URL } from '../../config'

import { Rating } from 'react-simple-star-rating'
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
        const { data } = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        setProfile(data)
        setComments(data.comments)
        console.log(data.comments)
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
      <Row className=" profile-container about-wrapper align-items-center flex-row-reverse">
        <Col className="detail-wrapper col-md-8">

          <h3 className="dark-color">{profile.userName}'s PROFILE</h3>
          <Row className="detail-container">
            <div className="detail-text">
              <h2>Username</h2>
              <p>{profile.userName}</p>
            </div>
            <div className="detail-text">
              <h2>E-mail</h2>
              <p>{profile.email}</p>
            </div>
          </Row>
        </Col>
        <Col className=" img-container col-md-4 mt-sm-0 mt-4">
          <img
            className="profile-avatar"
            src="https://i.pinimg.com/474x/ab/7f/8b/ab7f8b18534abf0842b01d8ec37f4f71--funny-shit-funny-stuff.jpg"
            title=""
            alt=""
          />
        </Col>
      </Row>

      <div className="row">
        <div className="profile-container text-center">
          <h4 className="mt-4">
            Previous Comments
          </h4>
          <Accordion defaultActiveKey="0" >
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
                      <div className="accordion-content-wrapper">
                        <Accordion.Body>
                          <Link to={`/movies/${comment.movieID.toString()}`}>
                            <div className="poster">
                              <img className="comment-img" src={comment.moviePoster} alt="poster" />
                              <div className="text overlay bg-gradient">
                                <p>
                                  view details
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className="comment-details">
                            <h3>Rating:</h3>
                            <Rating
                              size="30"
                              fillColorArray={[
                                'darkred',
                                'darkorange',
                                'gold',
                                'darkcyan',
                                'darkgreen',
                              ]}

                              ratingValue={comment.rating}
                              allowHover={false}
                              readonly={true} /* Rating Props */
                            />
                            <h3>Comment: </h3>
                            <p>{comment.text}</p>
                          </div>




                        </Accordion.Body>
                      </div>
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
