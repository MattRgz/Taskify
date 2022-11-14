import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import LeftArrowChecklist from '../components/LeftArrowChecklist';
import NavBarLogged from '../components/NavBarLogged'
import SearchBar from '../components/SearchBar';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import { findAllProducts } from '../services/productServices';
import { findOneSingleUser } from '../services/userServices';
import {postNewListProduct} from '../services/listServices';
import Swal from 'sweetalert2';

import {deleteAnExistingListProduct} from '../services/list_product'




const ChecklistView = () => {
	const [visible, setVisible] = useState(true);
	const [myProductList, setMyProductList] = useState([])
	const [productQ, setProductQ] = useState([])
	const [userForm, setUserForm] = useState({});
	const [products, setProducts] = useState();
	const [searchParameter, setSearchParameter] = useState();
	const [resultProducts, SetresultProducts] = useState([]);
	const [id_listProduct, setId_listProduct]=useState()
	const [user, setUser] = useState({});
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		findAllProducts(setProducts);
		findOneSingleUser(setUser);
	}, []);
	const showAlert = (mensaje) =>{
		Swal.fire({  
			icon: 'error',
			title: 'Oops...',
			text: `${mensaje}!`,
		})
	}
	const search = (e) => {
		e.preventDefault()
		setSearchParameter(e.target.value)
		let filterProducts = products.filter(unProducts => unProducts.name.includes(searchParameter))
		SetresultProducts(filterProducts)
	}
	// const addingAProductWithoutRepeatIt = (e, someObject) => {
	// 	e.preventDefault()
	// 	console.log(e.target)
	// 	const control = myProductList.filter(item => item === someObject)
	// 	if (control[0] !== someObject) {
	// 		setMyProductList([...myProductList, someObject])
	// 		SetresultProducts(null)
	// 	}
	// }
	const listId = useParams();
	const navigate = useNavigate();
	const login = () => {
		axios.get("http://localhost:8080/api/user/", { withCredentials: true })
			.then(res => {
				console.log('funciona!');
			}).catch(err => {
				console.log('Al login!');
				navigate('/login')
			}
			)
	}


	useEffect(() => {
		login()
		axios.get(`http://localhost:8080/api/list/${listId.id}/product/all`)
			.then((res) => {
				// setMyProductList(res.data.ListProducts.map((product) => { product.product_id.name }))

				setMyProductList(res.data.ListProducts.map((p) => { return p.product_id.name }))
				setProductQ(res.data.ListProducts.map((p) => { return p.quantity }))
				//guille
				setId_listProduct(res.data.ListProducts.map((p)=>{return p._id}))
				console.log(id_listProduct)
				console.log(res.data.ListProducts)
				//guille
				
			})
			.catch((err) => console.log("HOY NO SE PUDO :("))
	}, [refresh])

	const renderMyLabel = (e) => {
		e.preventDefault();
		setVisible(!visible)
	}

const {
	register,
	formState: { errors },
	handleSubmit,
	reset,
	} = useForm();
const onSubmit = (data) => {
	let myForm = {};
		(myForm = {
			product_name: data.productos,
			quantity:data.quantity
		});
		const productControl = products.filter(item => item.name === myForm.product_name)
		const listControl = myProductList.filter(item => item === myForm.product_name)
		if(productControl.length !== 0){
			if (listControl.length === 0){
				// const unespectedProductId = products.filter(producto => producto.name === myForm.product_name)[0]._id;  ESTA LOGICA PERMITE OBTENER EL ID DEL PRODUCTO EN LISTA
				postNewListProduct(listId.id,myForm)
				setRefresh(!refresh)
			}
			else{
				showAlert("Este producto ya en lista!")
			}
		}else{
			showAlert("Este producto no existe!")
		}
}


	//guille cambios
	useEffect(() => {
		console.log(myProductList)
	}, [myProductList]);

	const deleteThis = (index,id) => {
		let filterProducts = myProductList.filter(product => product !== myProductList[index]) 
		setMyProductList(filterProducts)
		console.log(filterProducts)
		console.log(id)
		deleteAnExistingListProduct(listId,id)
	}
	//guille cambios


	const labelButton = <div className='AddUnespectedProduct'>
		<h3 className='labelTransition' onClick={renderMyLabel} style={{ fontsize: '23px' }} >Añadir producto imprevisto</h3>
	</div>
	const addUnespected = <div className='AddUnespectedProduct1'>

	<div style={{ width: '100%', height: '100%' }}>
		<form className='centrar formUnespectedProduct' onSubmit={handleSubmit(onSubmit)}>
			<div className='centrar'>
				<div style={{ display: "flex", flexDirection: "Column", justifyContent: "center", alignItems: "center", marginBottom:'10px'}}>
					<input 
						style={{ textAlign: "center"}}
						id='producto' 
						list='productos' 
						name='productos' 
						className='letraSecundaria searchInput' 
						type="text" 
						placeholder="Nombre producto"
						{...register("productos",{required:true})}
						onChange={(e) => search(e)}
					/>
					{errors.name?.type === "required" && (
						<p className='label'>Debes ingresar un producto valido!</p>
					)}
						<datalist id='productos' style={{ backgroundColor: "white", position: "fixed", width: "200px" }}>
							{resultProducts?.map((unResultProducts, index) => (
									<option key={index} className='centrar2 searchHover' style={{ width: "200px" }} >{unResultProducts.name}</option>
							))}
						</datalist>

				</div>
			</div>
			<input 
				className='letraSecundaria inputUnespectedProduct'
				type="number" 
				placeholder='Cantidad'
				name='quantity'
				{...register("quantity",{required:true})} 
				/>
				{errors.name?.type === "required" && (
				<p className='label'>Debes ingresar un numero valido!</p>
				)}
			<div>
				<input 
					className='letraSecundaria button' 
					type="submit"
					value="Agregar"
				/>
				<button onClick={renderMyLabel} className=' letraSecundaria button formToLabelTransition'>Cerrar</button>
			</div>
		</form>
	</div>
</div>

	return (
		<div>
			<NavBarLogged />
			<h2><LeftArrowChecklist /> Tu lista de compras </h2>
			<SearchBar className="derecha" />
			<div style={{ marginTop: '4%' }}>
				<Table responsive="lg">
					<thead>
						<tr>
							<th className='centrar2'>Check</th>
							<th className='centrar2'>Producto</th>
							<th className='centrar2'>Cantidad</th>
						</tr>
					</thead>
					<tbody>
						{   
							myProductList.map((item, key) => {
								return (<tr>
									<td className='centrar2'><input type="checkbox" id={`check${key}`} /><label for={`check${key}`} /></td>
									<td className='centrar2'>{ item }</td>
									<td className='centrar2'>{ productQ[key] }</td>
									{/* guille */}
									<td className='centrar2'><button className='button2 deleteButton' onClick={() => deleteThis(key,id_listProduct[key] )}>Eliminar</button></td>
									{/* guille */}
								</tr>)
							})
						}
					</tbody>
				</Table>
				{
					visible ? labelButton : addUnespected
				}
				<div className='centrar newListButtonContainer'>
					<Link style={{ marginTop: '5%', width: '70%' }} to={'/my-list'}>
						<button style={{ width: '100%' }} className='letraSecundaria newListButton'>Finalizar</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ChecklistView;

// CREAR UN INTERMEDIO DONDE DEJAR LA DATA DEL FORMULARIO PARA EL PRODUCTO IMPREVISTO... UNA VEZ SE APRETA ENVIAR, SE ENVIA ESTE INTERMEDIO A LA DATABASE.... Y AñADIR EL DELETE.

