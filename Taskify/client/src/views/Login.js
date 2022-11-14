import "../App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../services/userServices";
import { Form, Button } from "react-bootstrap";
import NavBarUnLogged from '../components/NavBarUnLogged'


const Login = () => {
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] =useState()
  const [id, setId] = useState()
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

 

  const llegaId = (idDelUserServices) =>{
    setId(idDelUserServices)
    navigate(`/user`);
  }

  const onSubmit = (data, e) => {
    e.preventDefault();
    let userLog = {
      email: data.email,
      password: data.password,
    };
    login(userLog,setAlertMsg,alertMsg,llegaId);
  };




  return (
    <div className="colorPrimario">
      <NavBarUnLogged/>
      <Form onSubmit={handleSubmit(onSubmit)} className='letraPrincipal ' style={{marginTop:'10%'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="color">Email address</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
        </Form.Group>
        {errors.email?.type === "required" && <p>Este campo es requerido</p>}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="color">Password</Form.Label>
          <Form.Control
          className="input"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </Form.Group>
        {errors.password?.type === "required" && <p>Este campo es requerido</p>}
        <div className="centrar">
          <Button variant="primary" type="submit" style={{color:'white', backgroundColor:'black', borderColor:'black'}}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
