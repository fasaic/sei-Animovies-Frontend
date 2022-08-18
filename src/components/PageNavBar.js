
import { Link } from 'react-router-dom'

// Import React Bootstrap Components
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
const PageNavBar = () => {
  return (

    <NavBar expand="md" >
      <Container>
        <NavBar.Brand as={Link} to="/">🎥 <span className="logo">AMDB</span></NavBar.Brand>
        <input type="text" className="seach" placeholder="Search..."></input>
        {/* <NavBar.Toggle aria-controls="basic-navbar-nav"></NavBar.Toggle> */}
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
        
          <Nav.Link as={Link} to="/register" className='mx-5'>Register</Nav.Link>
          <Nav.Link as={Link} to="/login" className=''>Login</Nav.Link>
        </NavBar.Collapse>
      </Container>

    </NavBar>
  )
}

export default PageNavBar