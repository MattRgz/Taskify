import React,{useEffect,useState} from 'react';
import axios from 'axios';
import NavBarLogged from '../components/NavBarLogged';
import SavedList from '../components/SavedList';
import { Link, useNavigate } from 'react-router-dom';
import CreateListButton from '../components/CreateListButton';

const SavedChecklist = () => {

    const [allList, setAllList] = useState([]);
    const [userName, setUserName] = useState('');
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
    
    const refreshItem = () =>{
        setRefresh(!refresh)
    }
    useEffect(() => {
        login()
        axios.get('http://localhost:8080/api/user/', {withCredentials:true})
            .then((res)=>{
                setUserName(res.data.user.name)
                axios.get(`http://localhost:8080/api/user/${res.data.user._id}/list/all`)
                    .then((res)=>{setAllList([...res.data.lists])
                    console.log(allList)})
                    .catch((err)=>console.log('No fue posible obtener las listas'))
            })
            .catch('No se pudo obtener el ID de usuario')
    },[refresh])

    useEffect(() => {
        console.log(allList)
    },[allList])

    return (
        <div className='container'>
            <div>
                <NavBarLogged/>
                <h2 style={{marginLeft:'10%',marginTop:'5%'}}>CheckList Guardados</h2>
                {

                    allList.map( (item,key) => <SavedList key = {key} listTitle={item.title} authorId={userName} listId={item._id} refreshThis={refreshItem}/>)
                }
            </div>
            <div className='newListButtonContainer2'>
                <h3 className='centrar' style={{padding:'0 20%'}}>Nueva Lista de compras</h3>
                <div className='centrar newListButtonContainer'>
                    <CreateListButton/>
                    <Link style={{marginTop:'2%',width:'70%'}} to={'/my-inventory'}>
                        <button style={{width:'100%'}} className='letraSecundaria newListButton'>Mi inventario</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SavedChecklist;
