import { useState, ChangeEvent, MouseEvent } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Shelter } from '../Profile/Profile'
import { User } from '../Profile/Profile'
import editProfile from '../../services/editProfile'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Swal from 'sweetalert2'
import style from '../../CSS/EditAPet.module.css'

export default function EditProfile(props: { modal: Function; ownUser: any }) {
  type event =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>

  type mouseEvent = MouseEvent<HTMLButtonElement>

  let initialState = {
    id: props.ownUser._id,
    name: props.ownUser.name,
    lastname: props.ownUser.lastname,
    username: props.ownUser.username,
    image: props.ownUser.image,
    address: props.ownUser.address ? props.ownUser.address : null,
    phone: props.ownUser.phone ? props.ownUser.phone : null,
    description: props.ownUser?.description ? props.ownUser?.description : null,
    type: props.ownUser.type,
    imageFile: '',
  }

  const [input, setInput] = useState<any>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleChangeFoto(e: any) {
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    setInput({
      ...input,
      imageFile: file,
    })
  }

  function handleSubmit(e: mouseEvent) {
    const fd = new FormData()
    fd.append('name', input.name)
    fd.append('lastname', input.lastname)
    fd.append('address', input.address)
    fd.append('phone', input.phone)
    fd.append('description', input.description)
    fd.append('type', input.type)
    fd.append('_id', input.id)
    fd.append('username', input.username)
    // input.name && fd.append('name', input.name);
    input.imageFile && fd.append('image', input.imageFile)

    editProfile(fd)
    console.log(input)
    return Swal.fire({
      title: 'Guardado!',
      text: 'Publicacion editada con exito!',
      icon: 'success',
      confirmButtonText: 'Ok',
    })
  }

  // async function handleSubmit(e: any) {
  //   e.preventDefault()
  //   // console.log("Cristian")
  //   console.log("consologuealo te lo pido por favor ",input)
  //   // let password = await axios.post('/user/login', {username:input.username, password:input.password})
  //   // console.log(password.data)
  //     if(input.address && input.phone && input.description){
  //      await editProfile(
  //       input.name,
  //       input.username,
  //       input.lastname,
  //       input.address,
  //       input.phone,
  //       input.description,
  //       input.imageFile,
  //     )
  //     }else{
  //       await editProfile(
  //         input.name,
  //         input.username,
  //         input.lastname,
  //         input.imageFile,
  //       )
  //     }
  //     await props.modal()
  //     console.log("esta es la imagen ",input.image)
  //   // console.log("despues ", props.modal())
  // }

  // if(input.type === 'shelter'){
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Card
        className={style.form}
        elevation={5}
        sx={{
          borderRadius: '23px',

          paddingLeft: '37%',
          paddingRight: '37%',
        }}>
        <label className={style.file} style={{ marginBottom: '10px' }}>
          editar foto
          <input
            style={{ display: 'none' }}
            type='file'
            onChange={e => handleChangeFoto(e)}
            accept='.png, .jpg'
          />
        </label>

        {input.imageFile ? (
          <CardMedia
            component='img'
            alt={'img'}
            sx={{
              maxHeight: 300,
            }}
            image={URL.createObjectURL(input.imageFile)}
          />
        ) : input.image ? (
          <CardMedia
            component='img'
            alt={'img'}
            sx={{
              maxHeight: 300,
            }}
            image={input.image}
          />
        ) : null}

        <CardContent>
          {/* {detailpost.name ? ( */}
          <Typography gutterBottom variant='h6' component='div'>
            {' '}
            Nombre:
            <input
              name='name'
              defaultValue={input.name}
              onChange={handleChange}></input>
          </Typography>
          {/* ) : null} */}

          {/* <Typography
                sx={{ display: 'flex', flexDirection: 'column' }}
                gutterBottom
                variant='h5'
                component='div'>
                Tipo:{' '}
                <select onChange={handleChange}>
                  <option hidden selected>
                    {detailpost.type}
                  </option>
                  <option value='Perro'>perro</option>
                  <option value='Gato'>gato</option>
                  <option value='Otro'>otro</option>
                </select>
              </Typography>

              <Typography gutterBottom variant='h6' component='div'>
                Estado:{' '}
                <select onChange={handleChange} name='state'>
                  <option hidden selected>
                    {detailpost.state}
                  </option>
                  <option value='Perdido'>Perdido</option>
                  <option value='Encontrado'>Encontrado</option>
                  <option value='Adopción'>En adopcion</option>
                </select>
              </Typography>

              <Typography gutterBottom variant='h6' component='div'>
                Género:{' '}
                <select onChange={handleChange}>
                  <option hidden selected>
                    {detailpost.genre}
                  </option>
                  <option value='Macho'> Macho </option>
                  <option value='Hembra'> Hembra </option>
                </select>
              </Typography>

              <Typography gutterBottom variant='h6' component='div'>
                {' '}
                Descripcion:
                <textarea
                  defaultValue={"detailpost.description"}
                  onChange={
                    handleChange
                  }></textarea>
              </Typography> */}

          <Button variant='contained' onClick={handleSubmit}>
            Guardar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
  // }else{
  //   return(
  //     <div>hola</div>
  //  );
  // }
}
