import "../App.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  createNewUser, updateExistingUser,findOneSingleUser
} from "../services/userServices";
import { useNavigate, Link, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import NavBarLogged from '../components/NavBarLogged'







const FormIngresarUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState([]);


  const onSubmit = (data) => {
    let userForm;
      id?
          (userForm = {
              name: data.name,
              email:data.email,
              password:data.password,
              confirmPassword:data.confirmPassword,
              region: data.region,
              comune: data.comune,
              phone: data.phone,
              // listas: user.listas[{
              //   nombreLista:user.nombreLista,
              //   rpoducto: user.producto,
              //   precio:user.precio,
              // }],
            })
          :
          (userForm = {
            name: data.name,
            email:data.email,
            password:data.password,
            confirmPassword:data.confirmPassword,
            region: data.region,
            comune: data.comune,
            phone: data.phone,
          })

    console.log(userForm);
    if(id !== undefined){
      updateExistingUser(id, userForm, setAlertMsg, alertMsg)
      navigate(`/user`);
    } else {
      createNewUser(userForm,setAlertMsg, alertMsg);
      // console.log(artista_id)
      navigate('/login');
      // navigate(`/detalle/${artista_id}`);
    }
  };
  useEffect(() => {
    reset(user);
  }, [user]);

  useEffect(() => {
    id && findOneSingleUser(setUser );
  }, []);


  return (
    <div>
      <NavBarLogged/>
      <div className="centrar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Actualizar perfil</h2>
            <div>
              <p className="label">Nombre de usuario:</p>
              <input
                className="input"
                type="text"
                name="name"
                {...register("name", { required: true})}
              ></input>
              {errors.name?.type === "required" && (
                <p className="label">Debes ingresar un nombre de usuario valido!</p>
              )}
              <p className="label">Correo</p>
              <input
                className="input"
                type="mail"
                name="email"
                {...register("email", { required: true})}
              ></input>
              {errors.email?.type === "required" && (
                <p className="label">Debes ingresar un email valido!</p>
              )}
              <p className="label">Password</p>
              <input
                className="input"
                type="password"
                name="password"
                {...register("password", { required: true, minLength:8})}
              ></input>
              {errors.password?.type === "required" && (
                <p className="label">Debes ingresar una Password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="label">La password debe contener al menos 8 caracteres!</p>
              )}
              <p className="label"> Confirmar password</p>
              <input
                className="input"
                type="password"
                name="confirmPassword"
                {...register("confirmPassword", { required: true, minLength:8})}
              ></input>
              {errors.confirmPassword?.type === "required" && (
                <p className="label">Este campo es requerido!</p>
              )}
              {errors.confirmPassword?.type === "minLength" && (
                <p className="label">La password debe contener al menos 8 caracteres!</p>
              )}
              <div>
                <p style={{marginTop:'15px',marginBottom:'5px'}}>Direccion</p>
                <div>
                  <p className="label">seleccione region</p>
                  <select  className='letraSecundaria input' {...register("region", { required: true })}>
                    <option value="">Elige una opcion</option>
                    <option value="metropolitana">Metropolitana</option>
                    <option value="los lagos">Los lagos</option>
                    <option value="valparaiso">Valparaiso</option>
                    <option value="del maule">Maule</option>
                  </select>
                  {errors.region?.type === "required" && (
                    <p className="label">Este campo es requerido</p>
                  )}
                </div>
                <div>
                  <p className="label">Seleccione una comuna</p>
                  <select className='letraSecundaria input' {...register("comune", { required: true })}>
                    <option value="">Elige una opcion</option>
                    <option value="maipu">Maipu</option>
                    <option value="puente alto">Puente Alto</option>
                    <option value="providencia">Providencia</option>
                    <option value="las condes">Las Condes</option>
                    <option value="lo barnechea">Lo Barnechea</option>
                    <option value="lo prado">Lo Prado</option>
                  </select>
                  {errors.comuna?.type === "required" && (
                    <p className="label">Este campo es requerido</p>
                  )}
                </div>
              </div>
              <p style={{marginTop:'15px',marginBottom:'5px'}}>Telefono</p>
              <input
                className="input"
                type="text"
                name="phone"
                {...register("phone", { required: true,})}
              ></input>
              {errors.phone?.type === "required" && <p>Este campo es requerido</p>}
              <div className='centrar' style={{margin:'20%'}}>
                <Button  style={{backgroundColor:'black',borderColor:'black',marginRight:'15px'}} variant="success" type="submit">Actualizar</Button>
                <Button  style={{backgroundColor:'black',color:'white',borderColor:'black'}} variant="danger"> <Link to={"/"} style={{backgroundColor:'black',color:'white', textDecoration:'none'}}>Cancelar</Link></Button >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormIngresarUser;