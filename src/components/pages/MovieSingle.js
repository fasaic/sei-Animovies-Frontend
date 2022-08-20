import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios'

import YoutubeEmbed from '../YoutubeEmbed'
//! Components
// Bootstrap Components
import { CDBRating, CDBContainer } from 'cdbreact'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const MovieSingle = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState([])
  const [ directors, setDirectors ] = useState([])
  const [ cast, setCast ] = useState([])
  const [ tags, setTags ] = useState([])
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
                {/* <CDBContainer>
                  <CDBRating iconFaces fillClassName="text-black" iconRegular />
                </CDBContainer> */}
              </div>

            </div>
          </div>
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
              <Row>
                <p>Description:</p>
                <span>{movie.description}</span>
                <p>Production Company: <span>{movie.productionCompany}</span></p>
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
              <Row>
                <p>Box Office: <span>{movie.boxOffice}</span></p>
                <p>Budget: <span>{movie.budget}</span></p>
                <p>Release Year: <span>{movie.releaseYear}</span></p>
                <p>Run Time: <span>{movie.runtime}</span></p>
                <p>IMDB rating: <span>{movie.runtime}</span></p>
                <p>Average User Rating: <span>{movie.avgUserRating}</span></p>
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
      </Container>
    </div>
  )
}

export default MovieSingle