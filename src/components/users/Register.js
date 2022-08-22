import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Register = () => {
  const navigate = useNavigate()
  //! State
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    email: { message: '' },
    userName: { message: '' },
    password: { message: '' },
    confirmPassword: { message: '' },
  })

  //! Functions
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrors({ ...errors, [event.target.name]: '' })
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:4000/register',
        formData
      )
      setTokenToLocalStorage(data.token)
      navigate('/')
      console.log(formData)
    } catch (error) {
      console.log('error ->', error.response.data.errors)
      if (error.response.data.errors) setErrors(error.response.data.errors)
    }
  }

  return (
    <Container className="form-wrapper">
      {/* <Row> */}
      <form onSubmit={handleSubmit} className="justify-content-between">
        <h3 className="text-center">Register</h3>
        {/* Email */}
        <Row>
          <label htmlFor="userName">Username</label>
          <input
            onInput={handleChange}
            type="text"
            name="userName"
            value={formData.userName}
            placeholder="Username"
          />
        </Row>

        {/* Email */}
        <Row>
          <label htmlFor="email">Email</label>
          <input
            onInput={handleChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
          />
        </Row>
        {/* Password */}
        <Row>
          <label htmlFor="password">Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
          />
        </Row>

        {/* Confirm Password */}
        <Row>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="confirmPassword"
            value={formData.confirm}
            placeholder="Confirm Password"
          />
        </Row>
        {/* Error Message */}
        {/* <p className='text-danger my-2'>Error Message</p> */}

        {/* Submit */}
        <input type="submit" value="Register" className="btn dark" />
        <p className="text-center mb-0 mt-3">Already signed in?</p>
        <p className="text-center mb-0">
          <Link to="/login">Login</Link>
        </p>
      </form>
      {/* </Row> */}
    </Container>
  )
}

export default Register
