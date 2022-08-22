import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {

  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })

  const navigate = useNavigate()

  const [error, setError] = useState()

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:4000/login')
      setError(null)
      const { token } = data
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      navigate('/landing')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Container className='form-wrapper'>
      {/* <Row> */}
      <form onSubmit={onSubmit} className='justify-content-between'>
        <h3 className='text-center'>Login</h3>

        {/* Email */}
        <Row>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Email" />
        </Row>
        {/* Password */}
        <Row>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" />

        </Row>
        {/* Error Message */}
        {/* <p className='text-danger my-2'>Error Message</p> */}

        {/* Submit */}
        <input type="submit" value="Login" className='btn dark' />
        <p className='text-center mb-0 mt-3'>Not yet registered?</p>
        <p className='text-center mb-0'><Link to="/register">Register</Link></p>
      </form>
      {/* </Row> */}
    </Container>
  )
}

export default Login