import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'

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
          `http://localhost:4000/movies/${movieId}`
        )
        setMovie(data)
        setStills(data.stills)
        setDirectors(data.directors)
        setCast(data.cast)
        setTags(data.tags)
        setComments(data.comments)
        // console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

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
        const { data } = await axios.get(`http://localhost:4000/profile`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        console.log(data)
        // setProfile(data)
        // setName(data.name)
        setUserName(data.userName)
        // setFavourites(data.favouriteMovieGenre)
        // These needs fixing because it won't work as password is hashed
        // setPassword(data.password)
        // setConfirmPassword(data.confirmPassword)

        console.log(data)
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
      // headers: { Authorization: `Bearer ${token}`}
    }
  }

  // ! WATCHLIST LOGIC

  const handleAddToWatchlist = async (event) => {
    event.preventDefault()
    try {
      console.log(`ADD THIS TO WATCHLIST ->`, movieId)
      const req = await axios.post(
        `http://localhost:4000/watchlist/add/${movieId}`,
        movieId,
        headers()
      )
    } catch {
      console.log(error)
    }
  }

  // ! COMMENT LOGIC

  const handleAddComment = async (event) => {
    // event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)
      const { data } = await axios.post(
        `http://localhost:4000/${movieId}/comment`,
        formData,
        headers()
      )
      // console.log('form data -->', formData)
      setMovie(data)
      setFormData({ text: '', rating: '' })
      // window.location.reload()
    } catch (e) {
      setError(e)
      console.log(error)
    }
  }

  const handleUpdateComment = async (event) => {
    // event.preventDefault()
    try {
      console.log(getToken())
      console.log('form data -->', formData)
      const { data } = await axios.put(
        `http://localhost:4000/${movieId}/${event.target.name}`,
        formData,
        headers()
      )
      // console.log('form data -->', formData)
      // setMovie(data)
      setFormData({ text: '', rating: '' })
      // window.location.reload()
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
        `http://localhost:4000/${movieId}/${event.target.name}`,
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
      <Carousel fade interval="1200">
        <Carousel.Item>
          <img className="d-block w-100" src={stills.img1} alt="First slide" />
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
          <div className="title d-flex justify-content-between">
            <h2>{movie.name}</h2>
            <div className="d-flex rating-wrapper">
              <button
                onClick={handleAddToWatchlist}
                className="text-center rating"
              >
                <p className="m-0">ADD TO WATCHLIST</p>
              </button>
              <div className="ms-4 text-center rating">
                <p className="m-0">IMDB</p>
                <p>{movie.imdbRating}</p>
              </div>
              <div className="ms-4 text-center rating">
                <p className="m-0">AMDB</p>
                <p>{movie.avgUserRating}</p>
                {/* <Rating emptyColor="white" fillColor="yellow" ratingValue={movie.avgRating} allowHover={false} /> */}
              </div>
            </div>
          </div>
          <hr />

          {/* MOVIE POSTER + TRAILERS */}
          <div className="title-media mb-4 justify-content-center">
            <div className="poster">
              <img src={movie.posterImg} alt="poster" />
            </div>
            <div className="youtube">
              <YoutubeEmbed embedId={movie.youtubeId} />
            </div>
          </div>
          <hr />
          {/* <Row> */}

          <div className="content d-flex" key={movie._id}>
            <Row className="description">
              <p>Description:</p>
              <span>{movie.description}</span>
              <p>Production Company: </p>
              <span>{movie.productionCompany}</span>

              <p>
                Directors:
                <ul>
                  {directors.map((director) => {
                    return <li> {director} </li>
                  })}
                </ul>
              </p>

              <p>
                Cast:
                <ul>
                  {cast.map((cast) => {
                    return <li> {cast} </li>
                  })}
                </ul>
              </p>
            </Row>

            <Row className="description-2">
              <p>
                Box Office: <span>{movie.boxOffice}</span>
              </p>
              <p>
                Budget: <span>{movie.budget}</span>
              </p>
              <p>
                Release Year: <span>{movie.releaseYear}</span>
              </p>
              <p>
                Run Time: <span>{movie.runtime}</span>
              </p>
              <p>
                Tags:
                <ul>
                  {tags.map((tag) => {
                    return <li> {tag} </li>
                  })}
                </ul>
              </p>
            </Row>
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
                  customIcons={customIcons}
                  ratingValue={formData.rating} /* Rating Props */
                />
              </div>

              <textarea
                name="text"
                placeholder="What do you think about this movie?"
                maxlength="280"
                onChange={handleChange}
                required
              >
                {formData.text}
              </textarea>
              <input type="submit" value="Add Comment" required />
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
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {comments.map((comment) => {
                return (
                  <SwiperSlide key={comment._id}>
                    <div className="comment-box">
                      <div>
                        <img
                          src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940434.png?token=exp=1661093836~hmac=53c7b85d5270b8e5412efe3718a0e6b6"
                          alt="profile"
                        />
                        <p>{comment.userName}</p>
                        <Rating
                          onClick={handleRating}
                          emptyColor="darkgrey"
                          // fillColor="yellow"
                          fillColorArray={[
                            'darkred',
                            'darkorange',
                            'gold',
                            'darkcyan',
                            'darkgreen',
                          ]}
                          customIcons={customIcons}
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
                          {/* <button className={update ? '' : 'hide'} onClick={() => setUpdate(false)}>cancel</button> */}
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
    </div>
  )
}

export default MovieSingle

{
  /* <SwiperSlide>
<div className='comment-box'>
  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940434.png?token=exp=1661093836~hmac=53c7b85d5270b8e5412efe3718a0e6b6" alt="profile" />
  <p>User2</p>
  <CDBRating iconFaces fillClassName="text-black" iconRegular />
  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
</div>
</SwiperSlide>
<SwiperSlide>
<div className='comment-box'>
  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940417.png?token=exp=1661093836~hmac=dd1a5f3d7c7cb1933fca64033a4f6174" alt="profile" />
  <p>User3</p>
  <CDBRating iconFaces fillClassName="text-black" iconRegular />
  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
</div>
</SwiperSlide>
<SwiperSlide>
<div className='comment-box'>
  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940433.png?token=exp=1661093836~hmac=eead3a5f4749d0f14dada1688a26ca7d" alt="profile" />
  <p>User4</p>
  <CDBRating iconFaces fillClassName="text-black" iconRegular />
  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
</div>
</SwiperSlide> */
}
