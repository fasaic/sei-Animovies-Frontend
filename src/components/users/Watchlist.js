import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../auth/auth.js'

// ! Components
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'

const Watchlist = () => {
  // const userId = console.log('user')
  // const { userId } = useParams()

  const [profile, setProfile] = useState({})
  const [userWatchlist, setUserWatchlist] = useState([])
  const [updateWatchlist, setUpdateWatchlist] = useState([])
  const [error, setError] = useState(false)

  // ! GET USER WATCHLIST
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/watchlist`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setProfile(data)
        setUserWatchlist(data.watchlist)
        // console.log(data)
      } catch (err) {
        console.log(err)
        setError(true)
      }
    }
    getData()
  }, [updateWatchlist])

  console.log(userWatchlist)

  // ! DELETE MOVIE FROM USER WATCHLIST

  const handleRemoveFromWatchlist = async (event) => {
    try {
      console.log('DELETE MOVIE ->', event.target.value)
      const movieId = event.target.value
      const { data } = await axios.delete(
        `http://localhost:4000/watchlist/remove/${movieId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      )
      setUpdateWatchlist({ ...movieId })
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <>
      <h1>My Watchlist - User: {profile.userName}</h1>
      {userWatchlist.map((mappedObject, idx) => {
        const { _id, name, posterImg, releaseYear } = mappedObject
        return (
          <>
            <div className="d-flex justify-content-around align-items-center">
              <div className="card-container">
                <Link to={`/movies/${_id}`}>
                  <img src={posterImg} alt="poster" className="w-1" />
                  <div className="text overlay bg-gradient">
                    <p>
                      {name}, {releaseYear}
                    </p>
                  </div>
                </Link>
              </div>
              <button
                id="watchlist-btn"
                className="ms-3"
                value={_id}
                onClick={handleRemoveFromWatchlist}
              >
                Delete
              </button>
            </div>
          </>
        )
      })}
    </>
  )
}

export default Watchlist
