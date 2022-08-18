import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MovieSearch = () => {

  const [ movies, setMovies ] = useState([])
  const [ error, setError ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("mongodb+srv://root:YWKSv3PYCaq6DmU4@cluster0.lj0elay.mongodb.net/animovies?retryWrites=true&w=majority/movies")
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