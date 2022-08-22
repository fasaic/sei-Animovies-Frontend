import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'

import YoutubeEmbed from '../YoutubeEmbed'
//! Components
// Bootstrap Components
import { CDBRating, CDBContainer } from 'cdbreact'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
SwiperCore.use([Navigation, Pagination, Scrollbar])
const MovieSingle = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState([])
  const [directors, setDirectors] = useState([])
  const [cast, setCast] = useState([])
  const [tags, setTags] = useState([])
  const [comments, setComments] = useState([])
  const [stills, setStills] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/movies/${movieId}`)
        setMovie(data)
        setStills(data.stills)
        setDirectors(data.directors)
        setCast(data.cast)
        setTags(data.tags)
        setComments(data.comments)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])


  console.log(movie)
  return (
    <div className='movie-single-wrapper text-center'>
      <Carousel fade >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stills.img1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stills.img2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={stills.img3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>


      <Container className='content-wrapper'>
        {/* INFO WRAPPER */}
        <Row className='info-wrapper'>
          <div className='title d-flex justify-content-between'>
            <h2>{movie.name}</h2>
            <div className='d-flex rating-wrapper'>
              <div className='text-center rating'>
                <p className='m-0'>IMDB</p>
                <p>{movie.imdbRating}</p>
              </div>
              <div className='ms-4 text-center rating'>
                <p className='m-0'>AMDB</p>
                <p>{movie.avgUserRating}</p>
              </div>
            </div>
          </div>
          <hr />

          {/* MOVIE POSTER + TRAILERS */}
          <div className='title-media mb-4'>
            <div className='poster'>
              <img src={movie.posterImg} alt="poster" />
            </div>
            <div className="youtube">
              <YoutubeEmbed embedId={movie.youtubeId} />
            </div>
          </div>
          <hr />
          <Row>
            <div className='content d-flex' key={movie._id}>
              <Row className='description'>
                <p>Description:</p>
                <span>{movie.description}</span>
                <p>Production Company: </p>
                <span>{movie.productionCompany}</span>
                <p>Directors:
                  <ul>
                    {directors.map(director => {
                      return <li> {director} </li>
                    })}
                  </ul>
                </p>
                <p>Cast:
                  <ul>
                    {cast.map(cast => {
                      return <li> {cast} </li>
                    })}
                  </ul>
                </p>
              </Row>
              <Row className='description-2'>
                <p>Box Office: <span>{movie.boxOffice}</span></p>
                <p>Budget: <span>{movie.budget}</span></p>
                <p>Release Year: <span>{movie.releaseYear}</span></p>
                <p>Run Time: <span>{movie.runtime}</span></p>
                <p>Tags:
                  <ul>
                    {tags.map(tag => {
                      return <li> {tag} </li>
                    })}
                  </ul>
                </p>
              </Row>
            </div>
          </Row>
        </Row>

        {/* COMMENTS SECTION */}
        <Row className='comment-wrapper'>
          <div className='create-comment'>
            <form className='d-flex flex-column align-center'>
              <h3>Comments</h3>
              <CDBRating  iconFaces fillClassName="text-black" iconRegular />
              <textarea name="comment">What did you think about this movie?</textarea>
              {/* <input type="text" name="comment" placeholder='What did you think about this movie?'  /> */}
              <input type="submit" value="Add Comment" />
            </form>
          </div>
          <div className='previous-comments'>

            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={3}
              // navigation
              pagination={{clickable: true}}
              // scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide>
                <div className='comment-box text-center'>
                  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940418.png?token=exp=1661093836~hmac=2b35e831dfef9f3cf8fbe4a3baffcbc5" alt="profile" />
                  <p>User1</p>
                  {/* <CDBContainer > */}
                  <CDBRating  iconFaces fillClassName="text-black" iconRegular />
                {/* </CDBContainer> */}
                  <span className='mt-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='comment-box'>
                  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940434.png?token=exp=1661093836~hmac=53c7b85d5270b8e5412efe3718a0e6b6" alt="profile" />
                  <p>User2</p>
                  <CDBRating  iconFaces fillClassName="text-black" iconRegular />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='comment-box'>
                  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940417.png?token=exp=1661093836~hmac=dd1a5f3d7c7cb1933fca64033a4f6174" alt="profile" />
                  <p>User3</p>
                  <CDBRating  iconFaces fillClassName="text-black" iconRegular />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='comment-box'>
                  <img src="https://cdn-icons.flaticon.com/png/512/3940/premium/3940433.png?token=exp=1661093836~hmac=eead3a5f4749d0f14dada1688a26ca7d" alt="profile" />
                  <p>User4</p>
                  <CDBRating  iconFaces fillClassName="text-black" iconRegular />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies faucibus mi, a suscipit velit blandit eget. Sed eu convallis lacus. Ut varius purus sit amet ex iaculis, ut dictum orci pulvinar</span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </Row>


      </Container>
    </div>
  )
}

export default MovieSingle