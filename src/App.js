import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import Pages/Components
import Landing from "./components/pages/Landing"
import MovieSearch from "./components/pages/MovieSearch"
import MovieSingle from "./components/pages/MovieSingle"
import NotFound from "./components/NotFound"
import PageNavBar from "./components/PageNavBar"
import Login from "./components/users/Login"
import Register from "./components/users/Register"
import UserProfile from "./components/users/UserProfile"


const App = () => {
  return (
    <div className="site-wrapper">
      <BrowserRouter>
        <PageNavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<MovieSearch/>} />
          <Route path="/movies/:movieId" element={<MovieSingle />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* When working can add in the /:userId */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
