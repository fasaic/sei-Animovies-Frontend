import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Accordion from 'react-bootstrap/Accordion'
import Carousel from 'react-bootstrap/Carousel'

const UserProfile = () => {
  const userId = console.log('user')
  // const { userId } = useParams()
  const [name, setName] = useState('')
  const [userName, setUserName] = ''
  const [password, setPassword] = ''
  const [confirmPassword, setConfirmPassword] = ''
  const [favourites, setFavourites] = useState([])

  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/user/${userId}`)
        setName(data.name)
        setUserName(data.userName)
        setFavourites(data.favouriteMovieGenre)
        // These needs fixing because it won't work as password is hashed
        setPassword(data.password)
        setConfirmPassword(data.confirmPassword)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [userId])

  return (
    <Container className="profile-wrapper mb-5">
      <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">Profile</h3>
                <div className="row about-list">
                  <div className="col">
                    <div className="media">
                      <label>Name</label>
                      <p>Woody</p>
                    </div>
                    <div className="media">
                      <label>Username</label>
                      <p>Allen's Toy</p>
                    </div>
                    <div className="media">
                      <label>E-mail</label>
                      <p>fave@domain.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-4">
              <div className="about-avatar">
                <img
                  className="profile-avatar"
                  src="https://i.pinimg.com/474x/ab/7f/8b/ab7f8b18534abf0842b01d8ec37f4f71--funny-shit-funny-stuff.jpg"
                  title=""
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="counter">
            <div className="row">
              <div className="col">
                <div className="count-data text-center">
                  <h6 className="count h2 mt-4" data-to="150" data-speed="150">
                    Previous Comments
                  </h6>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Comment #1</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi u
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Comment #2</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <div className="recommend">
            <div className="row">
              <div className="col">
                <h3>Recommended Movies</h3>
                <div className="movie-single-wrapper text-center m-4">
                  <Carousel fade>
                    <Carousel.Item>
                      <h3> Image one </h3>

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <h3> Image two </h3>

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <h3> Image 3 </h3>

                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default UserProfile
