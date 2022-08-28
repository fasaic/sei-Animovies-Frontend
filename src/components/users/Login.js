import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getText } from '../../auth/auth.js'
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../../config'
import 'react-toastify/dist/ReactToastify.css';

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  const [loginData, setLoginData] = useState({
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

      const res = await axios.post(
        `${API_URL}/login`,
        loginData
      )
      getText(res.data.message)
      console.log('res-->', res.data.message)
      setError(null)
      const { token } = res.data
      localStorage.setItem('rcf-ani-token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      navigate('/')
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <Container className="form-wrapper min-vh-100">
      <ToastContainer />
      {/* <Row> */}
      <form onSubmit={onSubmit} className="justify-content-between">
        <h3 className="text-center">Login</h3>

        {/* UserName */}
        <Row>
          <label htmlFor="userName">Username</label>
          <input
            onInput={handleChange}
            type="text"
            name="userName"
            placeholder="Username"
            required
          />
        </Row>
        {/* Password */}
        <Row>
          <label htmlFor="password">Password</label>
          <input
            onInput={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Row>
        {/* Error Message */}
        {/* <p className='text-danger my-2'>Error Message</p> */}

        {/* Submit */}
        <input type="submit" value="Login" className="btn dark" />
        <p className="text-center mb-0 mt-3">Not yet registered?</p>
        <p className="text-center mb-0">
          <Link to="/register">Register</Link>
        </p>
      </form>
      {/* </Row> */}
    </Container>
  )
}

export default Login
