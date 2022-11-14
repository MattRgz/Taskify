import "../App.css";
import '../Styles.sass';
import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { findOneSingleUser } from "../services/userServices";
import { Button } from "react-bootstrap";
import NavBarLogged from '../components/NavBarLogged';
import axios from 'axios';


const PerfilUser = () => {

  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true)
  const login = () =>{
      axios.get("http://localhost:8080/api/user/", {withCredentials:true})
          .then(res=>{
              console.log('funciona!');
          }).catch(err=>{
              console.log('Al login!');
                  navigate('/login')
              }
          )
  }
  useEffect(() => {
      login()
  },[refresh])

  const [user, setUser] = useState({});

  useEffect(() => {
    findOneSingleUser(setUser);
  }, []);

  return (
    <div>
      <div>
        <NavBarLogged/>
      </div>
      <div style={{display:'flex', alignItems:'center',justifyContent:'center', textAlign:'center'}}>
        <div style={{marginTop:'4em', minWidth:'20em', backgroundColor:'white', height:'30em', padding:'30px 15px', display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column',borderRadius:'30px', boxShadow:'1px 1px 7px green'}}>
          <div className="avatar" style={{width:'150px', height:'100px', marginBottom:'15px', borderRadius:'50px'}}/>
          <p>Id: {user?._id}</p>
          <p>Nombre: {user?.name}</p>
          <p>Telefono: {user?.phone}</p>
          <p>Region: {user?.region}</p>
          <p>Comuna: {user?.comune}</p>
          <Link to={`/update/user/${user?._id}`} className='centrar' style={{textDecoration:'none'}}>
          <Button  style={{backgroundColor:'black',borderColor:'black',marginRight:'15px'}} variant="success">Editar mi perfil</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
