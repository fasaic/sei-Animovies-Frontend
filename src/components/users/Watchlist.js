import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../auth/auth.js'

// ! Components
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

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
      <div className="watchlist-wrapper min-vh-100">
        <Container className="grid-container mb-5 mt-5 ">
          {userWatchlist.map((mappedObject, idx) => {
            const { _id, name, posterImg, releaseYear } = mappedObject
            return (
              <>
                <div className="justify-content-center align-items-center">
                  <div className="card-container">
                    <img src={posterImg} alt="poster" className="w-1" />
                    <div className="overlay bg-gradient">
                      <button value={_id} onClick={handleRemoveFromWatchlist}>
                        x
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </Container>
      </div>
    </>
  )
}

export default Watchlist
