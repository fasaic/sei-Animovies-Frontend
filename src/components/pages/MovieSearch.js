import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'

const MovieSearch = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/movies')
        setMovies(data)
        console.log(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])

  const genreDummy = [
    'kids',
    'action',
    'adventure',
    'sci-fi',
    'fantasy',
    'animals',
  ]
  // console.log(movies[0].name)
  return (
    <Container className="search-wrapper">
      <h1>MovieSearch</h1>
      <div>
        {genreDummy.map((genre) => {
          return <span> {genre} | </span>
        })}
      </div>
      <div>
        {movies.map((movie) => {
          return (
            <>
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

                <div className="content" key={movie._id}>
                  <p>
                    Name: <span>{movie.name}</span>
                  </p>
                  <p>
                    Description: <span>{movie.description}</span>
                  </p>
                  <p>
                    Production Company: <span>{movie.productionCompany}</span>
                  </p>
                  <p>
                    Directors:
                    <ul>
                      {movie.directors.map((director) => {
                        return <li> {director} </li>
                      })}
                    </ul>
                  </p>
                  <p>
                    Cast:
                    <ul>
                      {movie.cast.map((cast) => {
                        return <li> {cast} </li>
                      })}
                    </ul>
                  </p>
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
                    IMDB rating: <span>{movie.runtime}</span>
                  </p>
                  <p>
                    Average User Rating: <span>{movie.avgUserRating}</span>
                  </p>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </Container>
  )
}

export default MovieSearch
