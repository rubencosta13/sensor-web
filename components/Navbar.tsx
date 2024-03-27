import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className='navbar-brand mb-0 fs-md-2 fs-lg-3'>
          <div className="d-md-flex flex-md-row">
            <div className="mr-md-2">
              <span>Qualidade do ar&nbsp;</span>
            </div>
            <div>
              <span className="d-md-none">na</span>
              <span className="d-none d-md-inline">na</span> Marinha Grande
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/sensor">O sensor</Nav.Link>
            <Nav.Link href="/temperatura">Temperatura</Nav.Link>
            <Nav.Link href="/humidade">Humidade</Nav.Link>
            <Nav.Link href="/particulas">Particulas</Nav.Link>
            <Nav.Link href="/advancedView">Exportar Dados</Nav.Link>
            <Nav.Link href="https://drive.google.com/file/d/1sWOf-VEf2ffNCn-3A9NtUZwQfJ_IUpD0/view">
              Informações
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
