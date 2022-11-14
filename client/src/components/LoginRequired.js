import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



const LoginRequired = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(true)
    const login = () =>{
        axios.get("http://localhost:8080/api/users/ingreso", {withCredentials:true})
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
    },[]) 
    return (
        <>

        </>
    );
}

export default LoginRequired;
