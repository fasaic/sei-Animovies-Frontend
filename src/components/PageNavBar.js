
import { Link, useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react'

// Import React Bootstrap Components
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
const PageNavBar = () => {

  const navigate = useNavigate()
  const handleClick = (event) => {
    console.log(event.target.value)
    if (event.target.value !== ''){
      navigate('/search')
    } else {
      navigate('/')
    }
   

  }

  return (

    <NavBar expand="md" >
      <Container>
        <NavBar.Brand as={Link} to="/">🎥 <span className="logo fw-bold">AMDB</span></NavBar.Brand>

        
        <NavBar.Toggle aria-controls="basic-navbar-nav"></NavBar.Toggle>
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <div className='search-container text-md-center text-end my-md-0 my-3'>
          <input type="text" className="seach" placeholder="Search..." onKeyUp={handleClick}></input>
        </div>

            <Nav.Link as={Link} to="/register" className=''><span className="underline">Register</span></Nav.Link>
            <Nav.Link as={Link} to="/login" className='ms-5 my-sm-3'><span className="underline">Login</span></Nav.Link>


        </NavBar.Collapse>

      </Container>

    </NavBar>
  )
}

export default PageNavBar