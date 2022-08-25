import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className="footer-wrap d-flex flex-column opacity-75 m-0">
      <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50 ">
        <div className=" container text-center">
          <small><Link to="/about">About</Link></small>
          <br />
          <small><a target='_blank' rel="noreferrer" href='https://www.fast.com'>Test Your Internet</a></small>
        </div>
      </footer>
    </div>
  )
}

export default Footer