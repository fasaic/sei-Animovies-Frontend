import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'

const MovieSearch = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [activeBtn, setActiveBtn] = useState('All')
  const [searchValue, setSearchValue] = useState([])
  const [filters, setFilters] = useState({
    tag: 'All',
    search: ''
  })
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`)
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
    'All',
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Sci-Fi',
    'Fantasy',
    'Animal',
    'Anime',
  ]


  const handleSearch = (event) => {
    setSearchValue(event.target.value)
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    setActiveBtn(event.target.value)

  }


  useEffect(() => {
    const regexSearch = new RegExp(filters.search, 'i')
    console.log('search value', regexSearch)
    console.log('saved tag', filters.tag)
    const filteredArray = movies.filter(movie => {
      // console.log('movie.tag-->', movie.tags)
      return regexSearch.test(movie.name) && ((movie.tags.includes(filters.tag)) || filters.tag === 'All')
    })
    console.log('filtered array', filteredArray)
    setFilteredMovies(filteredArray)

  }, [movies, filters])

  return (
    <Container className="search-wrapper min-vh-100">
      <div className='title-container'>
        <h1>Browse Animations</h1>
        <div className='search-container text-center text-end my-md-0 my-3'>
          <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
        </div>
        <div className='button-container'>
          {genreDummy.map((genre) => {
            return <button className={activeBtn === genre ? "btn-clicked": "" } onClick={handleSearch} name="tag" value={genre} > {genre}</button>
          })}
        </div>

      </div>

      <div className='grid-container'>
        {filteredMovies.map((movie) => {
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
              </div> 
            </>
          )
        })}
      </div>
    </Container>
  )
}

export default MovieSearch
