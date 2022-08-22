import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from '../auth/auth.js'

// Import React Bootstrap Components
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
const PageNavBar = () => {
  const navigate = useNavigate()
  const handleClick = (event) => {
    console.log(event.target.value)
    if (event.target.value !== '') {
      navigate('/search')
    } else {
      navigate('/')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    navigate('/')
    console.log('USER HAS LOGGED OUT')
  }

  return (
    <NavBar expand="md">
      <Container>
        <NavBar.Brand as={Link} to="/">
          🎥 <span className="logo fw-bold">AMDB</span>
        </NavBar.Brand>

        <NavBar.Toggle aria-controls="basic-navbar-nav"></NavBar.Toggle>
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="search-container text-md-center text-end my-md-0 my-3">
            <input
              type="text"
              className="seach"
              placeholder="Search..."
              onKeyUp={handleClick}
            ></input>
          </div>
          {userIsAuthenticated() ? (
            <>
              <Nav.Link as={Link} to="/profile" className="">
                <span className="underline">Profile</span>
              </Nav.Link>
              <Nav.Link onClick={handleLogout} as={Link} to="/">
                <span className="underline">Logout</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register" className="">
                <span className="underline">Register</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="ms-5 my-sm-3">
                <span className="underline">Login</span>
              </Nav.Link>
            </>
          )}
        </NavBar.Collapse>
      </Container>
    </NavBar>
  )
}

export default PageNavBar
