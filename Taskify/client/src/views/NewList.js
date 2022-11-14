// Test Pull
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBarLogged from '../components/NavBarLogged'
import LeftArrowChecklist from '../components/LeftArrowChecklist';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { findOneSingleUser } from '../services/userServices';
import { postNewList, postNewListProduct } from '../services/listServices';
//guille
import { useForm } from "react-hook-form";
import { findAllProducts } from '../services/productServices'
//guille
import Swal from 'sweetalert2';

const NewList = () => {
	const showAlert = (mensaje) =>{
		Swal.fire({  
			icon: 'success',
			title: 'Todo listo',
			text: `${mensaje}!`,
		})
	}
	const showErrorAlert = (mensaje) =>{
		Swal.fire({  
			icon: 'error',
			title: 'Ooops...',
			text: `${mensaje}!`,
		})
	}
	const navigate = useNavigate();
	const [refresh, setRefresh] = useState(true)
	const [quan, setQuan] = useState({})
	const login = () => {
		axios.get("http://localhost:8080/api/user/", { withCredentials: true })
			.then(res => {

			}).catch(err => {
				navigate('/login')
			}
			)
	}
	useEffect(() => {
		login()
	}, [refresh])

	//guille cambios
	const [imBuildingAList, setImBuildingAList] = useState([]);
	const [products, setProducts] = useState();
	const [searchParameter, setSearchParameter] = useState();
	const [resultProducts, SetresultProducts] = useState([])
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const [user, setUser] = useState({});

	useEffect(() => {
		findAllProducts(setProducts);
		findOneSingleUser(setUser);
	}, []);
// ESTO HACE EL BUSCADOR
	const search = (e) => {
		e.preventDefault()
		setSearchParameter(e.target.value)
		let filterProducts = products.filter(unPproducts => unPproducts.name.includes(searchParameter))
		SetresultProducts(filterProducts)
	}
	//ESTO AYUDA A NO DUPLICAR EN PREVIEW
	const selectingInTheSearchBar = (e, someObject) => {
		e.preventDefault()
		const control = imBuildingAList.filter(item => item === someObject)
		if (control[0] !== someObject) {
			setImBuildingAList([...imBuildingAList, someObject])
			SetresultProducts(null)
		}else{
			showErrorAlert('Este producto ya se encuentra listado!')
		}
	}

	const onSubmit = (data) => {
		let listForm = {
			title: data.listName,
			author_id: user._id,
			product_ids: imBuildingAList
		}
		axios.post('http://localhost:8080/api/list/new', listForm)
        .then((res) => {return res.data._id} )
		  .then((newListId) => {
			  imBuildingAList.map((product, index) => {
					let p = {
						product_name: product.name,
						// TODO corregir cantidad de producto que corresponde
						quantity: quan[index]
					}
			  		postNewListProduct(newListId, p)
			  })
			  	showAlert('Lista correctamente creada!')
				navigate("/checklist")  
			})
        .catch(err => console.log(err.response.data.error));
		  navigate('/checklist')
	}

	//guille cambios
	const deleteThis = (index) => {
		let filterProducts = imBuildingAList.filter(product => product !== imBuildingAList[index]) 
		setImBuildingAList(filterProducts)
	}
	const onChangeQuantity = (value, index) => {
		quan[index] = value;
		setQuan({...quan});
	}

	return (
		<div>
			<NavBarLogged />
			<h2><LeftArrowChecklist /> Nueva lista de compras </h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='centrar'>
					<input
						type='text'
						className='nameListInput'
						style={{ marginTop: '40px' }}
						placeholder='Escribe un nombre para tu lista'
						name='listName'
						{...register("listName", { required: true })} />
					{errors.name?.type === "required" && (
						<p className="label">Debe ingresar un nombre para su lista!</p>
					)}
				</div>
				<div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
					<Accordion className='col-sm-8'>
						<Accordion.Item eventKey="0">
							<Accordion.Header className='letraPrincipal'>
								Te recomendamos estos productos
							</Accordion.Header>
							<Accordion.Body>
								<Table>
									<tbody>
										<tr>
											<td className='centrar2 letraSecundaria'>PRODUCTO</td>
											<td className='centrar2 letraSecundaria'><button className='button2'>AGREGAR</button></td>
											<td className='centrar2 letraSecundaria'><button className='button2'>DESCARTAR</button></td>
										</tr>
									</tbody>
								</Table>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
				<div>
					<h2 style={{ margin: '30px' }}>
						Productos Añadidos
					</h2>
				</div>
				<div className='centrar' style={{ marginTop: '20px' }}>
					{/* cambio guille*/}
					<div style={{ display: "flex", flexDirection: "Column", justifyContent: "center", alignItems: "center" }}>
						<input className='letraSecundaria searchInput' type="text" placeholder='Buscar...'
							onChange={(e) => search(e)}
						/>
						<Table>
							<tbody style={{ backgroundColor: "white", position: "fixed", width: "200px" }}>
								{resultProducts?.map((unResultProducts, index) => (
									<tr key={index}>
										<td className='centrar2 searchHover' style={{ width: "200px" }} onClick={(e) => selectingInTheSearchBar(e, unResultProducts)} >{unResultProducts.name}</td>
										{/* <td  className='centrar2'>
                                        <Link to={`/detalle/product/${unResultProducts._id}`}>
                                            <Button variant="info">detalle</Button>
                                        </Link>
                                    </td> */}
									</tr>
								))}
							</tbody>
						</Table>
					</div>
					{/* cambio guille*/}
				</div>
				<div style={{ marginTop: '4%' }}>
					<Table responsive="lg">
						<thead>
							<tr>
								<th className='centrar2'>Producto</th>
								<th className='centrar2'>Cantidad</th>
							</tr>
						</thead>
						{/* guille */}
						<tbody>
							{
								imBuildingAList?.map((item, index) => (
									<tr key={index}>
										<td className='centrar2'>{item.name}</td>
										<td className='centrar2'>
											<input onChange={(e) => { onChangeQuantity(e.target.value, index) }} type="number" min="1" style={{ width: "20%", textAlign: "center" }} />
											{/* <input type="number" min="1" style={{ width: "20%", textAlign: "center" }} /> */}
										</td>
										
										<td className='centrar2 letraSecundaria'>
											<button className='button2 deleteButton' onClick={() => deleteThis(index)}>Eliminar</button>
										</td>
									</tr>
								))
							}
						</tbody>
						{/* guille */}
					</Table>
				</div>
				<div>
					<Link to='/checklist' className='centrar' style={{ textDecoration: 'none', color: 'black', marginTop: '10%' }}>
						<h5 className='centrar' style={{ fontSize: '14px' }}>Cancelar</h5>
					</Link>
					<div className='centrar'>
						<input className='button3' type="submit" value={'Crear'}/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewList;
