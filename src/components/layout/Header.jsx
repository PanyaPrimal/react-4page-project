import React, { useState } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

   return (
    <header className='px-5'>
        <Navbar
          expand="md"
          expanded={expanded}
          className='d-flex gap-5 mx-md-5'
          onSelect={() => setExpanded(false)}
          collapseOnSelect
        >
          <Navbar.Brand href="/">
            <Image
              src={logo}
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-center text-justify">
              <Nav.Item>
                <NavLink to="/about" className="nav-link fs-3 fw-bold" activeclassname="active" onClick={handleNavbarToggle}>About</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/gallery" className="nav-link fs-3 fw-bold" activeclassname="active" onClick={handleNavbarToggle}>Gallery</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/contacts" className="nav-link fs-3 fw-bold" activeclassname="active" onClick={handleNavbarToggle}>Contacts</NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/messages" className="nav-link fs-3 fw-bold" activeclassname="active" onClick={handleNavbarToggle}>Messages</NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    </header>
  );
};

export default Header;