import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './App.css'
import MyNavbar from './components/MyNav'
import MyFooter from './components/MyFooter'
import MyMain from './components/MyMain'
// import MyEdit from './components/MyEdit'
// import MySettings from './components/MySettings'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyCarouselSlick from './components/MyCarouselSlick'
import MoveDetails from './components/MoveDetails'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<MyMain />} />
            <Route
              path="/TVShows"
              element={
                <Container fluid className="px-4">
                  <h4>Series</h4>
                  <MyCarouselSlick filmName="series" type="series" page="6" />
                  <h4>Game</h4>
                  <MyCarouselSlick filmName="star wars" type="game" page="4" />
                </Container>
              }
            />
            <Route path="/movie-details/:movieId" element={<MoveDetails />} />
          </Routes>
          <MyFooter />
        </Container>
      </BrowserRouter>
    </div>

    // Netflix Edit
    // <div className="App">
    //   <MyEdit />
    // </div>

    // Netflix Settings
    //   <div className="App bg-white">
    //     <MyNavbar />
    //     <MySettings />
    //   </div>
  )
}

export default App
