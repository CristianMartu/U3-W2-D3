import { Container, Dropdown, DropdownButton, Image, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

const MyNavbar = (props) => (
  <Navbar expand="lg" data-bs-theme="dark" style={{ backgroundColor: '#221f1f !important' }}>
    <Container fluid>
      <Nav.Link className="navbar-brand" href="#">
        <Image src={logo} style={{ width: '100px', height: '55px' }} />
      </Nav.Link>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-nav me-auto mb-2 mb-lg-0">
        <div className="d-flex flex-column flex-lg-row me-auto mx-auto ms-lg-0">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/TVShows" className="nav-link">
            TV Shows
          </NavLink>
          <Nav.Link className="nav-link fw-bold" href="#">
            Movies
          </Nav.Link>
          <Nav.Link className="nav-link fw-bold" href="#">
            Recently Added
          </Nav.Link>
          <Nav.Link className="nav-link fw-bold" href="#">
            My List
          </Nav.Link>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-search icons"></i>
          {/* <div id="kids" className="fw-bold">
            KIDS
          </div> */}
          <DropdownButton id="dropdown-basic-button" title="KIDS" variant="dark">
            <Dropdown.Item href="#/action-1">
              <i className="bi bi-person-circle icons ms-0"></i>
              <span className="fs-6 fst-italic">Your Name</span>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <NavLink to="/edit" className="nav-link active">
                Account
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <NavLink to="/settings" className="nav-link active">
                Manage profiles
              </NavLink>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" className="text-danger">
              Sign out of Netflix
            </Dropdown.Item>
          </DropdownButton>
          <i className="bi bi-bell icons"></i>
          <i className="bi bi-person-circle icons"></i>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default MyNavbar
