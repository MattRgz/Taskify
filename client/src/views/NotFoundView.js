import React from 'react';
import NotFoundImage from '../image/NotFoundImage.png';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NotFoundView = () => {
    return (
        <div>
            {['xl'].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3 colorPrimario" style={{padding:'0',marginTop:'15px'}}>
                <Container fluid className="colorPrimario">
                    <Navbar.Brand href="#">Taskify</Navbar.Brand>
                </Container>
            </Navbar>
            ))}
            <div className='container' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <img src={NotFoundImage} alt="404 error, Page not found!" style={{width:'40%'}}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <h1>Oh!, no hemos podido encontrar la página que buscas!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundView;
