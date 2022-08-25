import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Pages/Components
import Landing from "./components/pages/Landing"
import MovieSearch from "./components/pages/MovieSearch"
import MovieSingle from "./components/pages/MovieSingle"
import NotFound from "./components/NotFound"
import PageNavBar from "./components/PageNavBar"
import Login from "./components/users/Login"
import Register from "./components/users/Register"
import UserProfile from "./components/users/UserProfile"
import Ratings from "./components/Ratings"
import Footer from "./components/Footer"
import About from "./components/About"



const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <PageNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/movies/:movieId" element={<MovieSingle />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* When working can add in the /:userId */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
