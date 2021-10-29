import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css";

type Data = {
  /*  name:string;
  lastname:string; */
  email: string;
  /* username: string; */
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit = handleSubmit((data) => {
    /* alert(JSON.stringify(data))  */
    /* alert(register) */
    console.log(document.getElementById('password'))  
    axios
      .post("http://localhost:3001/user/signup", data)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Fuiste registrado con exito",
          icon: "success",
          confirmButtonText: "Ingresa",
        });
        console.log(res);
      })
      .catch((error) => console.log(error.message));
  });
  const validate=(value:string|null)=>{
    /* if(value===document.getElementById('password':String).value) */
  
  }
  

  return (
    <div className="container">
      <h1>Registrate</h1>
      <form onSubmit={onSubmit}>
        {/* <div>
        <input {...register('name',{ required: true })} id="name" name="name" type="text" placeholder='Nombre'/>
        
      </div>
      <div>
        <input {...register('lastname',{ required: true })} id="lastname" name="lastname" type="text" placeholder='Apellido'/>
        
      </div> */}
        <div>
          <input
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
            id="email"
            name="email"
            type="text"
            placeholder="E-mail"
          />
          {errors.email && <p>Email invalido</p>}
        </div>
        {/*  <div>
        <input {...register('username',{ required: true })} id="username" name="username" type="text" placeholder='Usuario'/>
      </div> */}
        <div>
          <input
            {...register("password", { required: true, minLength: 8 })}
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p>La contraseña debe tener al menos 8 caracteres</p>
          )}
        </div>
        <div>
          <input
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              /* validate:{validate(value)} */
            })}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
          />
          {errors.confirmPassword && <p>Repite la contraseña ingresada</p>}
        </div>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/">Ingresa</Link>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;