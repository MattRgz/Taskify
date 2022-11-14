import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'
import '../Styles.sass';
import Bell from './Bell';

function OffcanvasExample() {

  const FuntionlogOut =() =>{

    axios.get('http://localhost:8080/api/logout',{ withCredentials: true })
      .then(res =>{
       Cookies.remove("usertoken") 
      })
      .catch(err => {
        console.log("hola soy el error",err)
      })
  }
 
  return (
    <div className='colorPrimario'>
      {['xl'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 colorPrimario" style={{padding:'0',marginTop:'15px'}}>
          <Container fluid className="colorPrimario">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Brand href="#">Taskify</Navbar.Brand>
            <Bell className="Bell"/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton className="colorTerciario">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Taskify
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="colorPrimario" >
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link className="letraSecundaria navLink" to="/checklist">Mis Listas</Link>
                    <Link className="letraSecundaria navLink" to="/my-inventory" >Mi Inventario</Link>
                    <Link className="letraSecundaria navLink" to="/user" >Mi cuenta</Link>
                    <hr/>
                    <Link className="letraSecundaria navLink" to="/" onClick={FuntionlogOut} >Cerrar sesion</Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}


export default OffcanvasExample;