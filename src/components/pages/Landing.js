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
  // console.log('name ->', filteredMovies[Object.keys(filteredMovies)[1]][0].name)

  // const nativeName = name.nativeName ? name.nativeName[Object.keys(name.nativeName)[0]].common : name.common

  // console.log(filteredMovies.[Object.keys(filteredMovies)[0]])
  // console.log('filteredMovies Name-->', Object.entries(filteredMovies)[3][1][1].name)
  // const filteredMovies = movies.filter(movie => movie.tags.includes(genres[2]))
  // console.log('filteredMovies-->', filteredMovies)
  // let newObj = []
  // useEffect(() => {

  // }, [movies])
  // genres.forEach((genre) => {
  //   newObj[genre] = movies.filter((movies) => movies.tags.includes(genre))
  // })

  // {
  //   'action': [{}],
  //   'adventure': [{}]
  // }

  // [ []]

  // console.log('newObj-->', newObj)
  // console.log('newObj Action-->', newObj.Action)
  // console.log('newObj Name-->', Object.entries(newObj)[3][1][1].name)

  // console.log('newObj key-->', Object.keys(newObj[0]))

  // for(i=1, i < genres.length; i++) {
  //   // Set genre name as key of the new object
  //   newObj key = genres[i]
  //   // set value of that key as the filtered array that includes that genres[i]
  //   newObject.key = [...movies.filter(movies => movies.tag.includes(genres[i]))]
  // }
  // filteredMovies = {
  //   'Action': [{Lego}, ],
  //   'Adventure': [{}]
  // }

  return (
    <Container as="main">
      <h1>Movies</h1>
      <Row>
        {movies.length > 0 ? (
          <>
            {Object.entries(filteredMovies).map((movie) => {
              // const { name, id, tags, imdbRating } = movie
              // const img = movie.posterImg
              console.log('movie->', movie)
              console.log('movie array->', movie[1])
              console.log('first movie->', (movie[1])[0].name)
              return (
                <>
                  <h3>{movie[0]}</h3>
                  {/* <h3>{(movie[1])[0].name}</h3> */}
                  {movie[1].map(movie => {
                    return <p>{movie.name}</p>
                  })}





                  {/* //{' '}
                  <Col className="mb-4" md="3" key={id}>
                    //{' '}
                    <Link className="mb-4" to={`/movies/${movie._id}`}>
                      //{' '}
                      <Card className="card ">
                        //{' '}
                        <Card.Img
                          variant="top"
                          className="w-100"
                          src={img}
                        ></Card.Img>
                        //{' '}
                        <Card.Body>
                          {imdbRating}
                          <Card.Title>{name}</Card.Title>
                        </Card.Body>
                        //{' '}
                      </Card>
                      //{' '}
                    </Link>
                    //{' '}
                  </Col> */}
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
