import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Login = () => {
  return (
    <div className-='form-page'>
      <Container>
        <Row>
          <form className='col-10 offset-1 col-md-6 offset-md-3'>
            <h3 className='text-center'>Login</h3>
            <Row>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="Email" />
            </Row>
            {/* Email */}


            {/* Password */}
            <Row>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password" />
            </Row>


            {/* Error Message */}
            <p className='text-danger'>Error</p>

            {/* Submit */}
            <input type="submit" value="Login" className='btn dark w-100' />
            <p className='text-center mb-0 mt-3'>Not yet registered?</p>
            <p className='text-center mb-0'><Link to="/register">Register</Link></p>
          </form>
        </Row>
      </Container>
    </div>
  )
}

export default Login