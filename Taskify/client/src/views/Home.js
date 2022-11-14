import "../App.css";
import HomeCardRight from "../components/HomeCardRight";
import HomeCardLeft from "../components/HomeCardLeft";
import NavBarLogin from "../components/NavBarLogin";
import ListImg from "../components/ListImg";
import InventoryImg from "../components/InventoryImg";
import ShoppingImg from "../components/ShoppingImg"
import {Link} from 'react-router-dom'; 

const Home = () => {
  
  
  return (
    <div className="container">
      <NavBarLogin/>
      <div style={{flexDirection:'column',width:'100%',height:'100%'}}>
        <div className='centrar' style={{width:'100%',height:'15em',marginBottom:'23%',marginTop:'20%'}}> 
          <h1 className="homeBrand anim-typewriter line-1">Taskify</h1>
        </div>
        <div className='centrar' style={{width:'100%',flexDirection:'column'}}>
          <HomeCardRight imgSrc={<ShoppingImg/>} text={'Taskify, una página para gestionar las compras e inventarios de tu negocio.'}/>
          <HomeCardLeft imgSrc={<InventoryImg/>}  text={'Crea, actualiza y comparte tus inventarios en base a la creacion de listas colaborativas.'}/>
          <HomeCardRight imgSrc={<ListImg/>} text={'Crea, actualiza  y guarda listas personalizadas,luego compartelas con tus amigos en un solo click!'}/>
        </div>
        <div className='centrar' style={{width:'100%',marginBottom:'10%'}}>
          <Link to='/ingresar/user' className="button centrar" style={{marginBottom:'10%',textDecoration:'none'}}>
            <button className="button centrar" style={{marginBottom:'10%'}}>Registrate acá</button>
          </Link>
        </div>
      </div>
      {/* <div className="bloque"  id="section1">
          <div className="contenedor"> 
            <h1>Taskify</h1>
            <p>una pagina para gestionar tus compras e inventarios</p>
          </div>
        </div> 
        <div className="bloque" id="section2">
          <div className="contenedor" > 
          <h1>Inventarios</h1>
            <p>crea y actualiza tus inventarios en base a la creacion de listas 
            reutilizables y compartibles</p>
          </div>
        </div> 
        <div className="bloque" id="section3">
          <div className="contenedor" > 
          <h1>Listas</h1>
            <p>guarda listas personaizables y compartelas con tus amigos en un solo click</p>
          </div>
        </div>         */}
    </div>
    
  );
};

export default Home;
