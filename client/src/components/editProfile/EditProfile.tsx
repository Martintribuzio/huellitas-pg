import { useState, ChangeEvent } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Shelter} from '../Profile/Profile'
import {User} from '../Profile/Profile'
import editProfile from '../../services/editProfile'
import axios from 'axios'
import CardMedia from '@mui/material/CardMedia';

export default function EditProfile(props: {modal:Function,ownUser: any}){
    let initialState = {
      name: props.ownUser.name,
      lastname: props.ownUser.lastname,
      username: props.ownUser.username,
      image: props.ownUser.image,
      address: props.ownUser.address ? props.ownUser.address : null,
      phone: props.ownUser.phone ? props.ownUser.phone : null,
      description: props.ownUser?.description ? props.ownUser?.description : null,
      type: props.ownUser.type,
      imageFile: '',
    };
  
  const[input,setInput] = useState<any>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  function handleChangeFoto(e: any) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setInput({
      ...input,
      imageFile: file,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log("Cristian")
    // console.log("consologuealo te lo pido por favor ",input)
    // let password = await axios.post('/user/login', {username:input.username, password:input.password})
    // console.log(password.data)
      if(input.address && input.phone && input.description){
       await editProfile(
        input.name,
        input.username,
        input.lastname,
        input.address,
        input.phone,
        input.description,
        input.imageFile,
      )
      }else{
        await editProfile(
          input.name,
          input.username,
          input.lastname,
          input.imageFile,
        )
      }
      await props.modal()
      // console.log("esta es la imagen ",input.image)
    // console.log("despues ", props.modal())
  }
  
  if(input.type === 'shelter'){
  return(
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Editar
      </Typography>
      
      <form onSubmit={(e) => handleSubmit(e)}>

      <label  style={{ marginBottom: '10px' }}>
            Editar foto
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={e => handleChangeFoto(e)}
          accept='.png, .jpg'
        />
      </label>

      {input.image ? (
                <img
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                  }}
                  alt='pet'
                  src={URL.createObjectURL(input.image)}
                />
              ) : null}
        <div>
          <input name='name' type='text' defaultValue={props.ownUser.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='password' type='password' placeholder="Contraseña actual" onChange={(e) => handleChange(e)}/>
        </div>
        {/* <div>
          <input name='newPassword' type='password' placeholder="Nueva contraseña"/>
        </div>
        <div>
          <input name='confirmPassword' type='password' placeholder="Confirmar contraseña"/>
        </div> */}
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
          Confirmar.
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

      <label  style={{ marginBottom: '10px' }}>
            Editar foto
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={e => handleChangeFoto(e)}
          accept='.png, .jpg'
        />
      </label>

      {input.imageFile ? <CardMedia
            component='img'
            alt={''}
            sx={{
              maxHeight: 300,
            }}
            image = {URL.createObjectURL(input.imageFile)}
          /> : null
        }
        <div>
          <input name='name' type='text' defaultValue={props.ownUser.name} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='lastname' type='text' defaultValue={props.ownUser.lastname} onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <input name='password' type='password' placeholder="Contraseña actual" onChange={(e) => handleChange(e)}/>
        </div>
        {/* <div>
          <input name='newPassword' type='password' placeholder="Nueva contraseña"/>
        </div>
        <div>
          <input name='confirmPassword' type='password' placeholder="Confirmar contraseña"/>
        </div> */}
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
