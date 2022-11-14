import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavBarLogged from '../components/NavBarLogged';
import EmptyInventory from '../components/EmptyInventory';
import FullInventory from '../components/FullInventory';

const Inventory = () => {
    const [inventory, setInventory] = useState('');
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
        axios
            .get('http://localhost:8080/api/user/', { withCredentials: true })
            .then((res)=>{
                res.data.user._id?axios.get(
                    `http://localhost:8080/api/inventory/${res.data.user.inventory_id}`
                ).then((res)=>setInventory(res.data.inventory)).catch((err)=>console.log('No pude obtener el ID de inventario')):console.log('No pude obtener el usuario')
            })
            .catch((err)=>{
                console.log(err)
            })
        console.log(inventory)
    },[refresh])

    return (
        <div className='container'>
            <div>
                <NavBarLogged/>
                <h2 style={{marginleft: "10%",marginTop:"5%"}}> Mi inventario </h2>
            </div>
            {inventory?<FullInventory/>:<EmptyInventory/>}
        </div>
    );
}

export default Inventory;
