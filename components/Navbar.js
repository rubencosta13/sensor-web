import React, {useEffect} from 'react';
import {Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
    
    return ( 
      <div>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Meteorologia</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/sensor">O sensor</Nav.Link>
                <Nav.Link href="/temperatura">Temperatura</Nav.Link>
                <Nav.Link href="/humidade">Humidade</Nav.Link>
                <Nav.Link href="/particulas">Particulas</Nav.Link>
                <Nav.Link href="/pressao">Pressão atmosférica</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </div>
    );
}
 
export default NavbarComponent;