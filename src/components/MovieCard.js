import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// * This will use dynamic data once the APIs are working, but until then I will hard code data for testing*
const MovieCard = () => {
  return (
    
    <div id="card-container">
      <div id="card-poster">
        <img src="https://m.media-amazon.com/images/M/MV5BYTg2Zjk0ZTctM2ZmMi00MDRmLWJjOGYtNWM0YjBmZTBjMjRkXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_FMjpg_UX1000_.jpg" alt="Lightyear-poster" />
      </div>
      <div id="card-title">
        <h3>Lightyear</h3>
      </div>
    </div>
  )
}

export default MovieCard