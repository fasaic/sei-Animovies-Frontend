import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    // <div className="footer-wrap d-flex flex-column  m-0">
      <footer id="sticky-footer" className="flex-shrink-0 ">
        <div className=" container text-center">
          <Link to="/about" className="">About Us</Link>
          {/* <p>ANIMOVIES</p> */}
          {/* <br /> */}
          <a target='_blank' rel="noreferrer" href='https://www.fast.com'>Test Your Internet!</a>
        </div>
      </footer>
    // </div>
  )
}

export default Footer