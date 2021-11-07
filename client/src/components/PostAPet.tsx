import { ChangeEvent, useEffect, useState } from 'react';
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
import Switch from './Login/Switch';

type event =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const validation = (input: any) => {
  const errors = {
    name: '',
    description: '',
    genre: '',
    date: '',
    petImage: '',
    type: '',
    state: '',
    ubication: '',
  };

  if (!input.name) {
    errors.name = 'El nombre es requerido';
  }
  if (!input.description) {
    errors.description = 'La descripción es requerida';
  }
  if (!input.genre) {
    errors.genre = 'El género es requerido';
  }
  if (!input.date) {
    errors.date = 'La fecha es requerida';
  }
  if (!input.petImage) {
    errors.petImage = 'La imagen es requerida';
  }
  if (!input.type) {
    errors.type = 'El tipo es requerido';
  }
  if (!input.state) {
    errors.state = 'El estado es requerido';
  }
  if (!input.ubication) {
    errors.ubication = 'La ubicación es requerida';
  }
  return errors;
};

const initialState = {
  name: '',
  description: '',
  genre: '',
  date: '',
  petImage: null,
  type: '',
  state: '',
  latitude: 0,
  longitude: 0,
};

export default function PostAPet(props: any) {
  const [name, setName] = React.useState('');
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedDate, handleDateChange] = useState();
  const history = useHistory();
  const [loading, result, user] = useUser();
  const [step, setStep] = useState(false);
  const [input, setInput] = useState<PostType>(initialState);
  const [error, setError] = useState({
    name: '',
    description: '',
    genre: '',
    date: '',
    petImage: '',
    type: '',
    state: '',
    ubication: '',
  });

  const handleToggle = () => setStep(!step);

  useEffect(() => {
    if (props.isOpen) {
      setStep(false);
    }
  }, [props.isOpen]);

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

  function handleChangeImg(e: Event | event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

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
    const errors = validation(input);
    setError(errors);

    if (!Object.values(error).some(error => error !== '')) {
      const id = window.localStorage.getItem('userId');
      const fd = new FormData();

      input.petImage && fd.append('petImage', input.petImage);
      input.name && fd.append('name', input.name);
      fd.append('state', input.state);
      fd.append('description', input.description);
      fd.append('type', input.type);
      fd.append('genre', input.genre);
      id && fd.append('id', id);

      postApet(fd);
    }
  }

  if (result === 'Unauthorized') {
    return <Redirect to='/login' />;
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formContainer}>
        <Switch
          handleToggle={handleToggle}
          isOn={step}
          onColor='white'
          label1='Datos'
          label2='Localizacion'
        />
        {!step ? (
          <div className={styles.inputsContainer}>
            <label>
              Estado de la mascota
              <select
                name='state'
                value={state}
                onChange={e => handleSelectEstado(e)}>
                <option value='Perdido'>Perdido</option>
                <option value='Encontrado'>Encontrado</option>
                <option value='Adopción'>En adopcion</option>
              </select>
              <small className={styles.error}>{error.state}</small>
            </label>

            {input.state === 'Perdido' || input.state === 'Adopción' ? (
              <label>
                Nombre
                <input type='text'></input>
              </label>
            ) : null}

            <label>
              Tipo de animal
              <select
                name='type'
                value={type}
                onChange={e => handletypechange(e)}>
                <option value='perro'> Perro </option>
                <option value='gato'> Gato </option>
                <option value='otro'> Otro </option>
              </select>
              <small className={styles.error}>{error.type}</small>
            </label>

            <label>
              Género
              <select
                name='genero'
                value={genre}
                onChange={e => handlegenrechange(e)}>
                <option value='Macho'> Macho </option>
                <option value='Hembra'> Hembra </option>
              </select>
              <small className={styles.error}>{error.genre}</small>
            </label>
            <div>
              <label className={styles.file}>
                Imagen
                <input
                  style={{ display: 'none' }}
                  type='file'
                  onChange={e => handleChangeImg(e)}
                />
              </label>
              <small className={styles.error}>{error.petImage}</small>
            </div>

            <label>
              Fecha
              <input
                name='date'
                type='date'
                value={selectedDate}
                onChange={e => handleChange(e)}
              />
              <small className={styles.error}>{error.date}</small>
            </label>

            <label>
              Descripcion:
              <textarea
                style={{ resize: 'none' }}
                rows={3}
                cols={21}
                maxLength={200}
                placeholder='Ingrese descripcion de su publicación'
                value={description}
                name='description'
                onChange={e => handlerdescritionchange(e.target.value)}
              />
              <small className={styles.error}>{error.description}</small>
            </label>
          </div>
        ) : (
          <>
            <LocationMap />
            <small className={styles.error}>{error.ubication}</small>
          </>
        )}
      </div>
      <Button className={styles.submit} type='submit'>
        Submit
      </Button>
    </form>
  );
}
