import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'
import { API_URL } from '../../config'
import userImg from '../../images/user.png'
import loaderImg from '../../images/loader.gif'

import YoutubeEmbed from '../YoutubeEmbed'
import StarRating from '../Ratings'
import { getToken, userIsAuthenticated } from '../../auth/auth.js'
//! Components
import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
} from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/free-mode'
import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdOutlineSentimentVeryDissatisfied,
  MdOutlineSentimentVerySatisfied,
} from 'react-icons/md'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bootstrap Components
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Watchlist from '../users/Watchlist'
SwiperCore.use([Navigation, Pagination, Scrollbar, Mousewheel, FreeMode])

const MovieSingle = () => {
  const { movieId } = useParams()


  const [movie, setMovie] = useState([])
  const [directors, setDirectors] = useState([])
  const [cast, setCast] = useState([])
  const [tags, setTags] = useState([])
  const [comments, setComments] = useState([])
  const [stills, setStills] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState([])
  const [update, setUpdate] = useState(false)
  const [watchlistData, setWatchlistData] = useState([])

  const [addRating, setAddRating] = useState(0)
  const [hover, setHover] = useState(0)

  const customIcons = [
    { icon: <MdOutlineSentimentDissatisfied size={20} /> },
    { icon: <MdOutlineSentimentNeutral size={20} /> },
    { icon: <MdOutlineSentimentSatisfied size={20} /> },
    { icon: <MdOutlineSentimentVeryDissatisfied size={20} /> },
    { icon: <MdOutlineSentimentVerySatisfied size={20} /> },
  ]

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/movies/${movieId}`
        )
        setMovie(data)
        setStills(data.stills)
        setDirectors(data.directors)
        setCast(data.cast)
        setTags(data.tags)
        setComments(data.comments)
        // console.log('movie-->', data)
        // console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [profile, setProfile] = useState({})
  const [userName, setUserName] = useState('')
  const [password, setPassword] = ''
  const [confirmPassword, setConfirmPassword] = ''
  const [favourites, setFavourites] = useState([])
  let isUpdate = false

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        // console.log(data)
        setUserName(data.userName)
        // console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  const headers = () => {
    const token = getToken().split(' ')[1]
    return {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  }

  // ! WATCHLIST LOGIC

  const handleAddToWatchlist = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO WATCHLIST ->`, movieId)
      const req = await axios.post(
        `${API_URL}/watchlist/add/${movieId}`,
        movieId,
        headers()
      )
    } catch {
      console.log(error)
    }
  }

  // ! COMMENT LOGIC

  const handleAddComment = async (event) => {
    event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)

      const res = await axios.post(
        `${API_URL}/${movieId}/comment`,
        formData,
        headers()
      )
      // console.log('form data -->', formData)
      setMovie(res.data)
      setFormData({ text: '', rating: '' })
      setMessage(res.data.message)
      console.log('res-->', res.data.message)
      window.location.reload()
      console.log('reloaded')
    } catch (error) {
      console.log('error message-->', error.response.data.message)
      // setError(e.data.message)
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error)
      // console.log('error message-->', e.res)

    }
  }

  const handleUpdateComment = async (event) => {
    // event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)
      const { data } = await axios.put(
        `${API_URL}/${movieId}/${event.target.name}`,
        formData,
        headers()
      )
      // console.log('form data -->', formData)
      // setMovie(data)
      setFormData({ text: '', rating: '' })
      window.location.reload()
    } catch (e) {
      setError(e)
      console.log(error)
    }
  }

  const handleChange = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleRating = (rating) => {
    setFormData({ ...formData, rating })
  }

  const handleDelete = async (event) => {
    console.log('comment to delete -->', event.target.name)
    try {
      const { data } = await axios.delete(
        `${API_URL}/${movieId}/${event.target.name}`,
        headers()
      )
      window.location.reload()
    } catch (e) {
      setError(e)
      console.log(error)
    }
  }

  const handleEdit = (event) => {
    setUpdate(true)
    console.log('setUpdate')
  }
  return (

    <div className="movie-single-wrapper text-center">

      {Object.keys(movie).length ?
        <>
          <Carousel fade interval="1200">
            <Carousel.Item>
              <img className="d-block w-100" src={movie.stills.img1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={stills.img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={stills.img3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>

          <Container className="content-wrapper">
            {/* INFO WRAPPER */}
            <Row className="info-wrapper">
              <Row className="title d-flex justify-content-between ">
                <Col className='col-md-3'>
                  <h2>{movie.name}</h2>
                </Col>

                <Col className="d-flex rating-wrapper col-md-9 justify-content-end">
                  <button onClick={handleAddToWatchlist} className="text-center watchlist-add ">
                    <p className="m-0">ADD TO WATCHLIST</p>
                  </button>
                  <div className="ms-4 text-center rating">
                    <p className="m-0">IMDB</p>
                    <p>{movie.imdbRating}</p>
                  </div>
                  <div className="ms-4 text-center rating">
                    <p className="m-0">ANIMOVIES</p>
                    <Rating
                      onClick={handleRating}
                      emptyColor="darkgrey"
                      // fillColor="yellow"
                      size={20}
                      fillColorArray={[
                        'darkred',
                        'darkorange',
                        'gold',
                        'darkcyan',
                        'darkgreen',
                      ]}
                      // customIcons={customIcons}
                      ratingValue={movie.avgRating}
                      allowHover={false}
                      readonly={true} /* Rating Props */
                    />
                  </div>
                </Col>
              </Row>
              <hr />

              {/* MOVIE POSTER + TRAILERS */}
              <Row className="title-media mb-4 justify-content-center">
                <Col className="poster col-5">
                  <img src={movie.posterImg} alt="poster" />
                </Col>
                <Col className="youtube">
                  <YoutubeEmbed embedId={movie.youtubeId} />
                </Col>
              </Row>
              <hr />
              {/* <Row> */}

              <div className="content d-flex">
                <Row className="description">
                  <p>Description:</p>
                  <span>{movie.description}</span>
                  <p>Production Company: </p>
                  <span>{movie.productionCompany}</span>

                  <p>Directors:</p>
                  <ul key={movie.directors}>
                    {movie.directors.map((director) => {
                      return <li> {director} </li>
                    })}
                  </ul>
                  <p>Cast:</p>
                  <ul key={movie.cast}>
                    {cast.map((cast) => {
                      return <li> {cast} </li>
                    })}
                  </ul>
                </Row>

                <div className="description-2">
                  <p>Box Office: <span>{movie.boxOffice}</span></p>
                  <p>Budget: <span>{movie.budget}</span></p>
                  <p>Release Year: <span>{movie.releaseYear}</span></p>
                  <p>Run Time: <span>{movie.runtime}</span></p>
                  <p>Tags:</p>
                  <div className='tags' key={movie.tag}>
                    {tags.map((tag) => {
                      return <button className='tags-text'> {tag} </button>
                    })}
                  </div>
                </div>
              </div>
              {/* </Row> */}
            </Row>

            {/* COMMENTS SECTION */}
            <Row className="comment-wrapper d-flex flex-sm-row flex-column align-content-center justify-content-center">
              <div className="create-comment">
                <h3>Comments</h3>
                <form
                  className="d-flex flex-column justify-content-between"
                  onSubmit={handleAddComment}
                >
                  <div className="d-flex align-center rate-container">
                    <p>Rate</p>
                    {/* <label htmlFor="rate">Rate</label> */}
                    <Rating
                      name="rate"
                      onClick={handleRating}
                      transition={true}
                      size={20}
                      // showTooltip={true}
                      emptyColor="darkgrey"
                      // fillColor="yellow"
                      required
                      fillColorArray={[
                        'darkred',
                        'darkorange',
                        'gold',
                        'darkcyan',
                        'darkgreen',
                      ]}
                      // customIcons={customIcons}
                      ratingValue={formData.rating} /* Rating Props */
                    />
                  </div>

                  <textarea
                    name="text"
                    placeholder="What do you think about this movie?"
                    maxLength="280"
                    onChange={handleChange}
                    required
                  >
                    {formData.text}
                  </textarea>
                  <input type="submit" value="Add Comment" required />
                  {/* <ToastContainer /> */}
                </form>
              </div>

              <div className="previous-comments">
                <Swiper
                  // install Swiper modules
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    Mousewheel,
                    FreeMode,
                  ]}
                  // spaceBetween={15}
                  slidesPerView={3}
                  freeMode={true}
                  mousewheel={true}
                  // navigation={{hideOnClick: true}}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    375: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                      scrollbar: { draggable: true },
                    },
                    768: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    920: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1081: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                  }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
                >
                  {comments.map((comment) => {
                    return (
                      <SwiperSlide key={comment._id}>
                        <div className="comment-box">
                          <div>
                            <img
                              src={userImg}
                              alt="profile"
                            />
                            <p>{comment.userName}</p>
                            <Rating
                              onClick={handleRating}
                              size={20}
                              emptyColor="darkgrey"
                              // fillColor="yellow"
                              fillColorArray={[
                                'darkred',
                                'darkorange',
                                'gold',
                                'darkcyan',
                                'darkgreen',
                              ]}
                              // customIcons={customIcons}
                              ratingValue={comment.rating}
                              allowHover={false}
                              readonly={true} /* Rating Props */
                            />
                          </div>

                          <div
                            className={
                              update && userName === comment.userName
                                ? 'comment-display hide'
                                : 'comment-display'
                            }
                          >
                            <div className="comment-content">
                              {/* <p className='mb-0 fs-'>rating</p> */}

                              <div className="comment-text">
                                <p>{comment.text}</p>
                              </div>
                            </div>

                            <div className="buttons">
                              {userName === comment.userName ? (
                                <button name={comment._id} onClick={handleEdit}>
                                  Edit
                                </button>
                              ) : (
                                <></>
                              )}
                              {userName === comment.userName ? (
                                <button name={comment._id} onClick={handleDelete}>
                                  🗑
                                </button>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          {userName === comment.userName ? (
                            <>
                              <form
                                className={
                                  update ? 'edit-comment' : 'edit-comment hide'
                                }
                                name={comment._id}
                                onSubmit={handleUpdateComment}
                              >
                                {/* <Rating name='rate' onClick={handleRating} emptyColor="white" fillColor="yellow" ratingValue={formData.rating} /> */}
                                <textarea
                                  name="text"
                                  placeholder={comment.text}
                                  onChange={handleChange}
                                >
                                  {formData.text}
                                </textarea>
                                <div className="buttons">
                                  <input type="submit" value="update" />
                                  <input
                                    type="button"
                                    value="Cancel"
                                    className={update ? '' : 'hide'}
                                    onClick={() => setUpdate(false)}
                                  />
                                </div>
                              </form>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </Row>
          </Container>
        </>
        :
        <h1 className='text-center'>{error ? 'error' : <img className="w-25" src={loaderImg} alt='loader'/>}</h1>
      }




    </div>
  )
}

export default MovieSingle

