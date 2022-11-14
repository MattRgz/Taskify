import React,{useState} from 'react';
import '../Styles.sass';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SavedList = ({listTitle,authorId,listId,refreshThis}) => {
    const showAlert = (mensaje) =>{
		Swal.fire({  
			icon: 'success',
			title: 'Todo listo',
			text: `${mensaje}!`,
		})
	}
    const [totalProducts, setTotalProducts] = useState();
    axios.get(`http://localhost:8080/api/list/${listId}/product/all`)
        .then(res=>setTotalProducts(res.data.ListProducts.length))
        .catch(err=>console.log("No se pudo obtener el numero total de productos"))
    const deleteList = (listId) =>{
        axios.delete('http://localhost:8080/api/list/delete/' + listId)
            .then(res =>{
                refreshThis()
                showAlert('Lista Correctamente Eliminada')
            }
            )
            .catch((err) => {
                alert(`Mensaje desde el back-End:
                ${err.response.data.msg}:
                ${err.response.data.error.message}`)
                console.log(err)
            })
    }
    return (
        <div className='savedList'>
            <Link to={`/list/${listId}`} style={{textDecoration:'none',color:'black',display:'flex',width:'100%'}}>
                <div style={{width:'50%'}}>
                    <h4>{listTitle}</h4> 
                    <h6>Creada por {authorId}</h6>
                </div>
                <div style={{width:'20%',textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <h5>{totalProducts}</h5>
                </div>
            </Link>
            <div style={{width:'30%',textAlign:'right'}}>
                <button  style={{cursor:'pointer'}}className='button2'  onClick={(e)=>{deleteList(listId)}}>Borrar</button>
            </div>
        </div>
    );
}

export default SavedList;
