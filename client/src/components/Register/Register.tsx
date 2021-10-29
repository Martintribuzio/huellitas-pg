import React from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {yupResolver}from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import "./Register.css";

type Data = {
   name:string;
  lastname:string;
  email: string;
  /* username: string; */
  password: string;
  confirmPassword: string;
};
const schema=yup.object().shape({
  name:yup.string().required('Ingresa tu nombre'),
  lastname:yup.string().required('Ingresa tu apellido'),
  email:yup.string().email().required(),
  password:yup.string().min(8).max(20).required(),
  confirmPassword:yup.string().oneOf([yup.ref('password'),null],'Las contraseñas no coinciden').required()
});

function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>(({resolver:yupResolver(schema)}));

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


  return (
    <div className="container">
      <h1>Registrate</h1>
      <form onSubmit={onSubmit}>
        <div>
        <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            fullWidth
            margin="dense"
          />
        )}
      />
        </div>
        <div>
        <Controller
        name="lastname"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Apellido"
            variant="outlined"
            error={!!errors.lastname}
            helperText={errors.lastname ? errors.lastname.message : ''}
            fullWidth
            margin="dense"
          />
        )}
      />
        </div>
      
        <div>
        <Controller
            name="email"
            control={control}
            defaultValue="example@dev.com"
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                fullWidth
                margin="dense"
              />
            )}
          />
        </div>
        {/*  <div>
        <input {...register('username',{ required: true })} id="username" name="username" type="text" placeholder='Usuario'/>
      </div> */}
        <div>
        <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ''}
                fullWidth
                margin="dense"
              />
            )}
          />
        </div>
        <div>
        <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirma tu contraseña"
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                fullWidth
                margin="dense"
              />
            )}
          />
        </div>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/">Ingresa</Link>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;