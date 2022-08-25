import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'

// Components
import MovieCard from '../MovieCard'

//! Components
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel, FreeMode, EffectCoverflow } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import "swiper/css/effect-coverflow";
SwiperCore.use([Navigation, Pagination, Scrollbar, Mousewheel, FreeMode, EffectCoverflow])

const Landing = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [directors, setDirectors] = useState([])
  const [cast, setCast] = useState([])
  const [tags, setTags] = useState([])
  const [imdb, setImdb] = useState('')
  const [release, setRelease] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  const genres = [
    // 'All',
    'Action',
    'Adventure',
    // 'Sci-fi',
    'Fantasy',
    // 'Animals',
    'Anime',
    'Crime',
  ]
  let filteredArray = []
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/movies')

        genres.forEach((genre) => {
          filteredArray[genre] = data.filter((data) =>
            data.tags.includes(genre)
          )
          setFilteredMovies(filteredArray)
          console.log('for each')
        })

        setMovies(data)
        setDirectors(data.directors)
        setCast(data.cast)
        setTags(data.tags)
        setImdb(data.imdbRating)
        setRelease(data.releaseYear)
        // console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  console.log('filteredMovies-->', filteredMovies)
  console.log('entries-->', Object.entries(filteredMovies))


  return (
    <Container className='landing-wrapper w-md-80'>
      <Row className='landing-header'>
        <Col className='landing-title col-5'>
          <div>
            <h1>Welcome to</h1>
            <h1 className='red'>ANIMOVIES</h1>
          </div>
          <div>
            <p>There is a lot more to <span>animations</span> than you think!</p>
            <p>Tell us how you feel, or browse for your favorite movies!</p>

          </div>
          <Link to={`/search`}>
          <button>Browse Animovies</button>
          </Link>
        </Col>
        <Col>

        </Col>
      </Row>
      <Row>
        {movies.length > 0 ? (
          <>

            {Object.entries(filteredMovies).map((movie) => {
              // const { name, id, tags, imdbRating } = movie
              // const img = movie.posterImg
              // console.log('movie->', movie)
              // console.log('movie array->', movie[1])
              // console.log('first movie->', (movie[1])[0].name)
              return (
                <>
                  <Row className='movie-carousel'>
                    <div className='genre-name'>
                      <h3>{movie[0]}</h3>
                    </div>

                    <div className='movies'>
                      <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, EffectCoverflow]}
                        mousewheel={true}
                        // coverflowEffect={{
                        //   rotate: 50,
                        //   stretch: 0,
                        //   depth: 100,
                        //   modifier: 1,
                        //   slideShadows: true,
                        // }}
                        // pagination={{ clickable: true }}
                        // navigation={true}
                        // slidesPerView={10} 
                        // spaceBetween={10}
                        grabCursor={true}
                        breakpoints={{
                          375: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                            scrollbar: { draggable: true },
                          },
                          500: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                          },
                          650: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                          },
                          880: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                          },
                          1024: {
                            slidesPerView: 8,
                            // spaceBetween: 30,
                            navigation: true
                          },
                        }}
                        freeMode={true}

                        // scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                      >
                        {movie[1].map(movie => {
                          return (
                            <SwiperSlide key={movie._id}>
                              <div className="d-flex justify-content-around align-items-center">
                                <div className="card-container">
                                  <Link to={`/movies/${movie._id}`}>
                                    <img src={movie.posterImg} alt="poster" className="w-1" />
                                    <div className="text overlay bg-gradient">
                                      <p>
                                        {movie.name}, {movie.releaseYear}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </SwiperSlide>
                          )
                        })}
                      </Swiper>
                    </div>
                  </Row>
                  {/* <Row className='movie-carousel'>
                    <h3>{movie[0]}</h3>
                    {movie[1].map(movie => {
                      return <p>{movie.name}</p>
                    })}
                    {movie[1].map(movie => {
                      return <p>{movie.name}</p>
                    })}
                  </Row> */}


                </>
              )
            })}


          </>
        ) : (
          <h1>{error ? 'error' : 'loading'}</h1>
        )}
      </Row>
    </Container>
  )
}

export default Landing
