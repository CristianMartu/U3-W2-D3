import { Button, Container, Dropdown, DropdownButton, Form, Image, Nav, Navbar } from 'react-bootstrap'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const MyNavbar = ({ setSearch }) => {
  const navigate = useNavigate()

  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearch(text)
    setText('')
  }

  return (
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
            <Form onSubmit={handleSubmit} className="d-flex justify-content-end align-items-center">
              <Form.Control
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="Search movie..."
              />
              <Button type="submit" variant="dark" className="rounded-end me-2">
                <i className="bi bi-search icons mx-0"></i>
              </Button>
            </Form>
            <DropdownButton id="dropdown-basic-button" title="KIDS" variant="dark">
              <Dropdown.Item eventKey="1">
                <i className="bi bi-person-circle icons ms-0"></i>
                <span className="fs-6 fst-italic">Your Name</span>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={() => navigate('/edit')}>
                Account
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={() => navigate('/settings')}>
                Manage profiles
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
}

export default MyNavbar
