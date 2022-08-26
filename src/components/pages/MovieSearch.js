import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'

const MovieSearch = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [btnColor, setBtnColor] = useState("whitesmoke");
  // get tags from api
  const [tags, setTags] = useState([])
  // set tag from tag button on frontend
  const [tag, setTag] = useState([])
  const [activeBtn, setActiveBtn] = useState('All')
  const [searchValue, setSearchValue] = useState([])
  const [clicked, setClicked] = useState('false')
  const [filters, setFilters] = useState({
    tag: 'All',
    search: ''
  })
  const [error, setError] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/movies')
        setMovies(data)
        setTags(data.tags)
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
    // 'Superhero',
    'Animal',
    'Anime',
  ]

  const navigate = useNavigate()

  const handleSearch = (event) => {
    // console.log(event.target.value)
    setSearchValue(event.target.value)
    // if (event.target.value !== ''){
    //   navigate('/search')
    // } else {
    //   navigate('/')
    // }
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    console.log('newObj', newObj)
    setFilters(newObj)
    // event.target.className="btn-clicked"
    setActiveBtn(event.target.value)
    // btnColor === "whitesmoke" ? setBtnColor("wheat") : setBtnColor("whitesmoke")
    
  }

  const handleClick = (event) => {
    event.preventDefault()
    // console.log(event.target.value)
    setTag(event.target.value)

    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    setFilters(newObj)
    
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

  const genres = [...new Set(movies.map(movie => movie.tags))]
  return (
    <Container className="search-wrapper min-vh-100">
      <div className='title-container'>
        <h1>Browse Animations</h1>
        <div className='search-container text-md-center text-end my-md-0 my-3'>
          <input type="text" className="seach" placeholder="Search..." onChange={handleSearch} name="search" value={filters.search}></input>
        </div>
        <div className='button-container'>
          {genreDummy.map((genre, index) => {

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

// <div className="content" key={movie._id}>
// <p>
//   Name: <span>{movie.name}</span>
// </p>
// <p>
//   Description: <span>{movie.description}</span>
// </p>
// <p>
//   Production Company: <span>{movie.productionCompany}</span>
// </p>
// <p>
//   Directors:
//   <ul>
//     {movie.directors.map((director) => {
//       return <li> {director} </li>
//     })}
//   </ul>
// </p>
// <p>
//   Cast:
//   <ul>
//     {movie.cast.map((cast) => {
//       return <li> {cast} </li>
//     })}
//   </ul>
// </p>
// <p>
//   Box Office: <span>{movie.boxOffice}</span>
// </p>
// <p>
//   Budget: <span>{movie.budget}</span>
// </p>
// <p>
//   Release Year: <span>{movie.releaseYear}</span>
// </p>
// <p>
//   Run Time: <span>{movie.runtime}</span>
// </p>
// <p>
//   IMDB rating: <span>{movie.runtime}</span>
// </p>
// <p>
//   Average User Rating: <span>{movie.avgUserRating}</span>
// </p>
// </div>