import { useState, useEffect } from 'react'
import axios from 'axios'
import { getToken } from '../../auth/auth.js'

const Watchlist = () => {
  // const userId = console.log('user')
  // const { userId } = useParams()

  const [profile, setProfile] = useState({})
  const [watchlist, setWatchlist] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/watchlist`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        setProfile(data)
        setWatchlist(data.likedMovies)
        // console.log(data)
      } catch (err) {
        console.log(err)
        setError(true)
      }
    }
    getData()
  }, [])

  console.log(profile.likedMovies)

  // console.log('user watchlist ->', profile.likedMovies)

  return (
    <>
      <h1>{profile.userName}'s Movie Watchlist</h1>
      {watchlist.map((mappedObject, i) => {
        const { _id, name, posterImg } = mappedObject
        return <p key={i}>{name}</p>
      })}
    </>
  )
}

export default Watchlist
