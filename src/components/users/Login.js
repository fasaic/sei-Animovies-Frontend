import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  return (
    <Container className='form-wrapper'>
      {/* <Row> */}
      <form className='justify-content-between'>
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