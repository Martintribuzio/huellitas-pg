import { useState, ChangeEvent } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Shelter} from '../Profile/Profile'
import {User} from '../Profile/Profile'
import editProfile from '../../services/editProfile'


export default function EditProfile(props: {modal:Function,ownUser: any}){
    let initialState = {
      name: props.ownUser.name,
      lastname: props.ownUser.lastname,
      username: props.ownUser.username,
      image: props.ownUser.image,
      address: props.ownUser.address ? props.ownUser.address : null,
      phone: props.ownUser.phone ? props.ownUser.phone : null,
      description: props.ownUser?.description ? props.ownUser?.description : null,
      type: props.ownUser.type
    };
  
  const[input,setInput] = useState<any>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log("Cristian")
    if(input.address && input.phone && input.description){
     await editProfile(
      input.name,
      input.username,
      input.address,
      input.phone,
      input.description,
     )
    }else{
      await editProfile(
        input.name,
        input.lastname,
        input.username,
      )
    }
    await props.modal()
    // console.log("despues ", props.modal())
  }
  
  if(input.type){
  return(
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Editar
      </Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input name='name' type='text' defaultValue={props.ownUser.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input type='password' placeholder="Contraseña actual"/>
        </div>
        <div>
          <input type='password' placeholder="Nueva contraseña"/>
        </div>
        <div>
          <input type='password' placeholder="Confirmar contraseña"/>
        </div>
        <div>
          <input name='phone' type='text' defaultValue={props.ownUser.phone} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='address' type='text' defaultValue={props.ownUser.address} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='description' type='text' defaultValue={props.ownUser.description} onChange={(e) => handleChange(e)}/>
        </div>
        <Button
          style={{ marginTop: '20px', width: '300px', marginBottom: '20px' }}
          variant='contained'
          type='submit'
          // onClick={() => props.modal()}
        >
          Confirmar
        </Button>
      </form>
    </Box>
  );
  }else{
    return(
      <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Editar
      </Typography>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input name='name' type='text' defaultValue={props.ownUser.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='lastname' type='text' defaultValue={props.ownUser.lastname} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input type='password' placeholder="Contraseña actual"/>
        </div>
        <div>
          <input type='password' placeholder="Nueva contraseña"/>
        </div>
        <div>
          <input type='password' placeholder="Confirmar contraseña"/>
        </div>
        <Button
          style={{ marginTop: '20px', width: '300px', marginBottom: '20px' }}
          variant='contained'
          type='submit'
          // onClick={() => props.modal()}
        >
          Confirmar
        </Button>
      </form>
    </Box>
   );
  }
}
