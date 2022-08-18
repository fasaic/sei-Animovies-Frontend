import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Components
import MovieCard from '../MovieCard'

const Landing = () => {
  return (
    <>
    <h1>Landing Page</h1>
    <Link to="/search">Movie Search Page</Link>
    {/* <MovieCard /> */}
    </>
  )
}

export default Landing