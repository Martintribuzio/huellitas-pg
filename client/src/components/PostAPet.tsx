import { FormControl, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import '../CSS/PostAPet.module.css';
import { PostType } from '../redux/types/types';
import styles from '../CSS/PostAPet.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import useUser from '../hooks/useUser';

import Swal from 'sweetalert2';
import { postPet } from '../services/createPost';

const Input = styled('input')({
  display: 'none',
});

export default function PostAPet() {
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedDate, handleDateChange] = useState(new Date());
  const history = useHistory();
  const [loading, result, user] = useUser();
  // HOOK PARA VERIFICACION DE USUARIO LOGEADO
  // RETORNA Unauthorized si no esta logueado

  console.log('POST');
  const [input, setInput] = useState<PostType>({
    name: '',
    description: '',
    genre: '',
    date: '',
    petImage: null,
    type: '',
    state: '',
  });

  const handlegenrechange = (event: SelectChangeEvent) => {
    setGenre(event.target.value);
    setInput({ ...input, genre: event.target.value });
  };

  const handlerdescritionchange = (event: string) => {
    console.log(event);
    setDescription(event);
    console.log(description);
    setInput({ ...input, description: event });
  };

  const handletypechange = (event: SelectChangeEvent) => {
    setType(event.target.value);
    setInput({ ...input, type: event.target.value });
  };

  const handleSelectEstado = (event: SelectChangeEvent) => {
    //console.log(event);
    setInput({
      ...input,
      [event.target.name]: event.target.value as string,
    });
    setState(event.target.value);
  };

  function handleChange(e: htmlTypes) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setName(e.target.value);
    setInput({ ...input, name: e.target.value });
  }

  function handleChangeImg(e: ChangeEvent<HTMLInputElement>) {
    setInput({
      ...input,
      petImage: e.target.files?.item(0),
    });
  }

  //console.log(input);

  type htmlTypes =
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>
    | ChangeEvent<HTMLInputElement>;

  async function postApet(fd: FormData) {
    let result: any = await postPet(fd);
    if (result.ERROR) {
      return Swal.fire({
        title: 'ERROR!',
        // text: '!',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
    history.push('/home/feed');
    return Swal.fire({
      title: 'Publicado!',
      text: 'Publicacion realizada con exito!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const id = window.localStorage.getItem('userId');
    const fd = new FormData();
    if (input.petImage) {
      fd.append('petImage', input.petImage);
    }
    if (input.name && input.name !== '') {
      fd.append('name', input.name);
    }
    fd.append('state', input.state);
    fd.append('description', input.description);
    fd.append('type', input.type);
    fd.append('genre', input.genre);
    if (id) {
      fd.append('id', id);
    }
    postApet(fd);
  }

  // if (result === 'Unauthorized') {
  //   history.push('/');
  // }
  if (result === 'Unauthorized') {
    return <Redirect to='/login' />;
  }
  return (
    <div className={styles.conteiner}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* <FormControl sx={{ m: 1, minWidth: 120 }} />
        <InputLabel>Nombre</InputLabel>
        <TextField
          name='name'
          value={name}
          onChange={e => handleInputChange(e)}
          required
        /> */}

        <label>Estado de la mascota:</label>
        <FormControl style={{ margin: '1px', minWidth: '120px' }}>
          <InputLabel id='demo-simple-select-helper-label'>Estado</InputLabel>
          <Select
            required
            name='state'
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={state}
            label='Estado'
            onChange={e => handleSelectEstado(e)}>
            <MenuItem value=''>
              <em></em>
            </MenuItem>
            <MenuItem value='Perdido'>Perdido</MenuItem>
            <MenuItem value='Encontrado'>Encontrado</MenuItem>
            <MenuItem value='Adopción'>En adopcion</MenuItem>
          </Select>
        </FormControl>

        {/* <label>Nombre:</label> */}
        <FormControl sx={{ m: 1, minWidth: 120 }} />
        {input.state === 'Perdido' || input.state === 'Adopción' ? (
          <>
            <InputLabel id='demo-simple-select-helper-label'>
              Nombre de la mascota
            </InputLabel>
            <TextField
              name='name'
              value={name}
              onChange={e => handleInputChange(e)}
            />
          </>
        ) : (
          <></>
        )}

        <label>Tipo de animal: </label>
        <FormControl style={{ margin: '1px', minWidth: '120px' }}>
          <InputLabel id='demo-simple-select-helper-label'>Tipo</InputLabel>
          <Select
            required
            name='type'
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={type}
            label='Tipo'
            onChange={e => handletypechange(e)}>
            <MenuItem value=''>
              <em></em>
            </MenuItem>
            <MenuItem value='perro'>Perro</MenuItem>
            <MenuItem value='gato'>Gato</MenuItem>
            <MenuItem value='otro'>Otro</MenuItem>
          </Select>
        </FormControl>

        <label>Género </label>
        <FormControl style={{ margin: '1px', minWidth: '120px' }}>
          <InputLabel id='demo-simple-select-helper-label'>Género</InputLabel>
          <Select
            required
            name='genero'
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={genre}
            label='Género'
            onChange={e => handlegenrechange(e)}>
            <MenuItem value=''>
              <em></em>
            </MenuItem>
            <MenuItem value='Macho'>Macho</MenuItem>
            <MenuItem value='Hembra'>Hembra</MenuItem>
          </Select>
        </FormControl>

        <label>Imagen: </label>
        <label>
          <Input
            accept='.jpg, .png'
            name='img'
            type='file'
            onChange={handleChangeImg}
            required
          />
          <Button variant='contained' color='secondary' component='span'>
            Upload
          </Button>
        </label>
        {/*  <input
          name='img'
          type='file'
          onChange={handleChangeImg}
          required></input> */}

        <label>Fecha: </label>
        <input
          name='date'
          type='date'
          onChange={e => handleChange(e)}
          required></input>

        <label>Descripcion: </label>
        <TextField
          placeholder='Ingrese descripcion de su publicación'
          multiline
          rows={4}
          name='description'
          onChange={e => handlerdescritionchange(e.target.value)}
          required
          label='Descripción'
        />

        <Button
          type='submit'
          style={{ marginBottom: '10px' }}
          variant='contained'
          color='secondary'>
          Publicar
        </Button>
      </form>
    </div>
  );
}
