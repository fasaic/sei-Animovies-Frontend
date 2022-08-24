import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'

// Components
import MovieCard from '../MovieCard'

const Landing = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [directors, setDirectors] = useState([])
  const [cast, setCast] = useState([])
  const [tags, setTags] = useState([])
  const [imdb, setImdb] = useState('')
  const [release, setRelease] = useState('')

  const genres = [
    'All',
    'Kids',
    'Action',
    'Adventure',
    'Sci-fi',
    'Fantasy',
    'Animals',
    'Anime',
    'Crime',
  ]


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/movies')
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





  return (
      <Container as='main'>
        <h1>Movies</h1>
        <Row>
          {movies.length > 0 ?
            <>
              {movies.map(movie => {
                const { name, id, tags, imdbRating } = movie
                const img = movie.posterImg
                return (
                  <Col className="mb-4" md='3' key={id}>
                    <Link className="mb-4" to={`/movies/${movie._id}`}>
                      <Card className='card '>
                        <Card.Img variant='top' className='w-100' src={img}></Card.Img>
                        <Card.Body>{imdbRating}<Card.Title>{name}</Card.Title></Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              })}
            </>
            :
            <h1>
              {error ? 'error' : 'loading'}
            </h1>
          }
        </Row>
      </Container >
  )
}

export default Landing