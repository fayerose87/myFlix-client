import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./nav-view.scss";
import Logo from "url:~/src/images/myFlix.png";

export class NavView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-static-top">
          <Navbar.Brand href="/">
            <img src={Logo} className="d-inline-block align-top" height="80px" width="auto" alt="myFlix logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Genres" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/genre/Action`}>
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/genre/Drama`}>
                  Drama
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/genre/Fantasy`}>
                  Fantasy
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`//genre/Sci-Fi`}>
                  Sci-Fi
                </NavDropdown.Item>
                <NavDropdown.Item has={Link} to={`//genre/Thriller`}>
                  Thriller
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Directors" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/director/Christopher%20Nolan`}>
                  Christopher Nolan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/director/David%20Fincher`}>
                  David Fincher
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/director/Frank%20Darabont`}>
                  Frank Darabont
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/director/Michael%20Gondry`}>
                  Michael Gondry
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/director/Peter%20Jackson`}>
                  Peter Jackson
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/director/Robert%20Zemeckis`}>
                  Robert Zemeckis
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`director/Terry%20Gilliam`}>
                  Terry Gilliam
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Nav>
              <Nav.Link as={Link} to={profile}>My Account</Nav.Link>
              <Nav.Link onClick={() => { this.onLoggedOut() }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
    );
  }
}
export default NavView;
