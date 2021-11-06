import { ChangeEvent, useState } from 'react';
import '../CSS/PostAPet.module.css';
import { PostType } from '../redux/types/types';
import styles from '../CSS/PostAPet.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { useHistory, Redirect } from 'react-router-dom';
import useUser from '../hooks/useUser';
import LocationMap from './LocationMap/LocationMap.js';
import Swal from 'sweetalert2';
import { postPet } from '../services/createPost';

type event =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default function PostAPet() {
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedDate, handleDateChange] = useState();
  const history = useHistory();
  const [loading, result, user] = useUser();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<PostType>({
    name: '',
    description: '',
    genre: '',
    date: '',
    petImage: null,
    type: '',
    state: '',
    latitude: 0,
    longitude: 0,
  });
  console.log({ input });
  const handlegenrechange = (e: event) => {
    setGenre(e.target.value);
    setInput({ ...input, genre: e.target.value });
  };

  const handlerdescritionchange = (e: string) => {
    setDescription(e);
    setInput({ ...input, description: e });
  };

  const handletypechange = (e: event) => {
    setType(e.target.value);
    setInput({ ...input, type: e.target.value });
  };

  const handleSelectEstado = (e: event) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value as string,
    });
    setState(e.target.value);
  };

  function handleChange(e: event) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleInputChange(e: event) {
    setName(e.target.value);
    setInput({ ...input, name: e.target.value });
  }

  function handleChangeImg(e: Event | event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    console.log(file);

    setInput({
      ...input,
      petImage: file,
    });
  }

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
    setStep(step + 1);
    if (step === 2) {
      postApet(fd);
    }
  }

  if (result === 'Unauthorized') {
    return <Redirect to='/login' />;
  }
  if (step === 0) {
  }
  return (
    <div className={styles.conteiner}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContainer}>
          {!step ? (
            <div className={styles.inputsContainer}>
              <label>
                Estado de la mascota
                <select
                  required
                  name='state'
                  value={state}
                  onChange={e => handleSelectEstado(e)}>
                  <option value='Perdido'>Perdido</option>
                  <option value='Encontrado'>Encontrado</option>
                  <option value='Adopción'>En adopcion</option>
                </select>
              </label>

              {input.state === 'Perdido' || input.state === 'Adopción' ? (
                <input type='text'></input>
              ) : null}

              <label>
                Tipo de animal
                <select
                  required
                  name='type'
                  value={type}
                  onChange={e => handletypechange(e)}>
                  <option value='perro'> Perro </option>
                  <option value='gato'> Gato </option>
                  <option value='otro'> Otro </option>
                </select>
              </label>

              <label>
                Género
                <select
                  required
                  name='genero'
                  value={genre}
                  onChange={e => handlegenrechange(e)}>
                  <option value='Macho'> Macho </option>
                  <option value='Hembra'> Hembra </option>
                </select>
              </label>

              <label className={styles.file}>
                Imagen
                <input
                  style={{ display: 'none' }}
                  type='file'
                  onChange={e => handleChangeImg(e)}
                />
              </label>

              <label>
                Fecha
                <input
                  name='date'
                  type='date'
                  value={selectedDate}
                  onChange={e => handleChange(e)}
                  required
                />
              </label>

              <label>
                Descripcion:
                <textarea
                  style={{ resize: 'none' }}
                  rows={7}
                  cols={21}
                  maxLength={200}
                  placeholder='Ingrese descripcion de su publicación'
                  value={description}
                  name='description'
                  onChange={e => handlerdescritionchange(e.target.value)}
                  required
                />
              </label>
            </div>
          ) : (
            <div className='mapContainer'>
              <LocationMap />
            </div>
          )}
        </div>
        <Button className={styles.submit} type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
