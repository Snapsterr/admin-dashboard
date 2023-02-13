import { Container, Nav, Navbar } from "react-bootstrap"
import { useLocation } from "react-router"
import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { logoutUser } from "../store/slices/authSlice"

const DangerLink = styled(Link)`
  border-radius: 5px;
  &:hover {
    border-radius: 5px;
    background-color: red;
    color: #fff;
  }
`

const NavMenu = () => {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      collapseOnSelect
      className="w-100"
    >
      <Container fluid>
        <Navbar.Brand href="https://legiosoft.net">Legiosoft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="w-full" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="me-auto" activeKey={pathname}>
            <Nav.Link className="nav-link" href="https://legiosoft.net">
              Home
            </Nav.Link>
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </Nav>
          <Nav>
            <DangerLink
              className="nav-link"
              to="/login"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </DangerLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu
