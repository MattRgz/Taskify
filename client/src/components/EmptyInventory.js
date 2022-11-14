import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import CreateListButton from './CreateListButton';
import NavBarLogged from './NavBarLogged'

const EmptyInventory = () => {
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
    return (
            <div className='container'>
                <div className='container' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                    <h1>Inventario vacio!</h1>
                    <h3>Crea una nueva lista</h3>
                    <CreateListButton/>
                </div>
            </div>
        );
}

export default EmptyInventory;
