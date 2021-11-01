import { FormControl, SelectChangeEvent } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import '../CSS/PostAPet.module.css';
import { useDispatch } from 'react-redux';
import { PostType } from '../redux/types/types';
import { postPet } from '../redux/actions';
import styles from '../CSS/PostAPet.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useUser from '../hooks/useUser';

export default function PostAPet() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const history = useHistory();

  // HOOK PARA VERIFICACION DE USUARIO LOGEADO
  // RETORNA Unauthorized si no esta logueado

  const [loading, result, user] = useUser();
  if (result === 'Unauthorized') {
    history.push('/');
  }

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

  function handleSubmit(e: any) {
    e.preventDefault();
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
    dispatch(postPet(fd)); //mando form a trvaes del axios lol
    alert('Publicado!');
    history.push('/home');
  }
  if (loading) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div className={styles.conteiner}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nombre:</label>
          <FormControl sx={{ m: 1, minWidth: 120 }} />
          <InputLabel id='demo-simple-select-helper-label'>Nombre</InputLabel>
          <TextField />

          <label>Estado de la mascota:</label>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>estado</InputLabel>
            <Select
              required
              name='state'
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={state}
              label='estado'
              onChange={e => handleSelectEstado(e)}>
              <MenuItem value=''>
                <em></em>
              </MenuItem>
              <MenuItem value='lost'>perdido</MenuItem>
              <MenuItem value='found'>Encontrado</MenuItem>
              <MenuItem value='adoption'>en adopcion</MenuItem>
            </Select>
          </FormControl>

          <label>Tipo de animal: </label>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>tipo</InputLabel>
            <Select
              required
              name='type'
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={type}
              label='tipo'
              onChange={e => handletypechange(e)}>
              <MenuItem value=''>
                <em></em>
              </MenuItem>
              <MenuItem value='perro'>perro</MenuItem>
              <MenuItem value='gato'>gato</MenuItem>
              <MenuItem value='otro'>otro</MenuItem>
            </Select>
          </FormControl>

          <label>Genero </label>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-helper-label'>genero</InputLabel>
            <Select
              required
              name='genero'
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={genre}
              label='genero'
              onChange={e => handlegenrechange(e)}>
              <MenuItem value=''>
                <em></em>
              </MenuItem>
              <MenuItem value='male'>macho</MenuItem>
              <MenuItem value='female'>hembra</MenuItem>
            </Select>
          </FormControl>

          <label>Imagen: </label>
          <input
            name='img'
            type='file'
            onChange={handleChangeImg}
            required></input>

          <label>Fecha: </label>
          <input
            name='date'
            type='date'
            onChange={e => handleChange(e)}
            required></input>

          <label>Descripcion: </label>
          <textarea
            placeholder='Ingrese descripcion de su publicacion'
            name='description'
            onChange={e => handleChange(e)}
            required></textarea>

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
}
