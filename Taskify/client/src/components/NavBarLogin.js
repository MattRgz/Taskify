import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../Styles.sass'

function NavBarLogin() {
  return (
    <div className='colorPrimario'>
      {['xl'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 colorPrimario" style={{padding:'0',marginTop:'15px'}}>
          <Container fluid className="colorPrimario">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton className="colorTerciario">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Taskify
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="colorPrimario">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link className="letraSecundaria navLink" to="/">Home</Link>
                  <Link className="letraSecundaria navLink" to="/login">Login</Link>
                  <Link className="letraSecundaria navLink" to="/ingresar/user">Registrarse</Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default NavBarLogin;
