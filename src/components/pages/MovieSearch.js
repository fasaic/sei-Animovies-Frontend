import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MovieSearch = () => {

  const [ movies, setMovies ] = useState([])
  const [ error, setError ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/movies")
        setMovies(data);
        console.log(data)
      } catch(error) {
        setError(error)
        console.log(error)
      }
    }
    getData()
  }, [])


  return <h1>MovieSearch</h1>
}

export default MovieSearch