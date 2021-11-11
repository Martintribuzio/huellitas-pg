import { ChangeEvent, useEffect, useState } from 'react';
import '../CSS/PostAPet.module.css';
import { PostType } from '../redux/types/types';
import styles from '../CSS/PostAPet.module.css';
import React from 'react';
import Button from '@mui/material/Button';
import useUser from '../hooks/useUser';
import LocationMap from './LocationMap/LocationMap.js';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
import { postPet } from '../services/createPost';
import Switch from './Login/Switch';
import { useSelector } from 'react-redux';
import { typeState } from '../redux/reducers';
import { validation } from '../helpers/validationPost';
import { SpinnerCircular } from 'spinners-react';

type event =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

// interface HTMLInputEvent extends Event {
//   target: HTMLInputElement & EventTarget;
// }

const initialState = {
  name: '',
  description: '',
  genre: '',
  date: '',
  petImage: null,
  type: '',
  state: '',
  latitude: '',
  longitude: '',
};
const initialError = {
  description: '',
  genre: '',
  date: '',
  petImage: '',
  type: '',
  state: '',
};

export default function PostAPet(props: any) {
  const coordenadas = useSelector((state: typeState) => state.coordenadas);
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [_, result] = useUser();
  const [step, setStep] = useState(false);
  const [input, setInput] = useState<PostType>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  const handleToggle = () => setStep(!step);

  useEffect(() => {
    setLoading(false);
    if (props.isOpen) {
      setStep(false);
    }
    setInput(initialState);
    setState('');
    setType('');
    setGenre('');
    setError(initialError);
  }, [props.isOpen]);

  useEffect(() => {
    if (coordenadas.lat && coordenadas.long) {
      setInput({
        ...input,
        latitude: coordenadas.lat,
        longitude: coordenadas.long,
      });
    }
  }, [coordenadas]);

  const handlegenrechange = (e: event) => {
    setGenre(e.target.value);
    setInput({ ...input, genre: e.target.value });
  };

  const handlerdescritionchange = (event: string) => {
    setDescription(event);
    setInput({
      ...input,
      description: event,
    });
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

    const errorImage = validation(
      {
        ...input,
        petImage: file,
      },
      'image'
    );

    setError({ ...error, petImage: errorImage.petImage });
    setInput({
      ...input,
      petImage: file,
    });
  }

  async function postApet(fd: FormData) {
    setLoading(true);
    let result: any = await postPet(fd);
    if (result.ERROR) {
      return Swal.fire({
        title: 'ERROR!',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
    props.closeModal();
    return Swal.fire({
      title: 'Publicado!',
      text: 'Publicacion realizada con exito!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const errors = validation(input);

    if (Object.values(errors).every(error => error === '')) {
      console.log('if');
      const id = window.localStorage.getItem('userId');
      const fd = new FormData();
      fd.append('latitude', input.latitude);
      fd.append('longitude', input.longitude);
      input.petImage && fd.append('petImage', input.petImage);
      input.name && fd.append('name', input.name);
      fd.append('state', input.state);
      fd.append('description', input.description);
      fd.append('type', input.type);
      fd.append('genre', input.genre);
      id && fd.append('id', id);
      if (!step) {
        console.log('post');
        setStep(true);
        return;
      }
      postApet(fd);
      e.target.reset();
    }
    setError(errors);
  }

  console.log(step);

  const maxDate = (): string => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

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
                <option hidden selected>
                  Estado
                </option>
                <option value='Perdido'>Perdido</option>
                <option value='Encontrado'>Encontrado</option>
                <option value='Adopción'>En adopcion</option>
              </select>
              <small className={styles.error}>{error.state}</small>
            </label>

            {input.state === 'Perdido' || input.state === 'Adopción' ? (
              <label>
                Nombre
                <input
                  value={input.name}
                  onChange={e => {
                    setInput({ ...input, name: e.target.value });
                  }}
                  type='text'></input>
              </label>
            ) : null}

            <label>
              Tipo de animal
              <select
                name='type'
                value={type}
                onChange={e => handletypechange(e)}>
                <option hidden selected>
                  Tipo
                </option>
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
                <option hidden selected>
                  Género
                </option>
                <option value='Macho'> Macho </option>
                <option value='Hembra'> Hembra </option>
              </select>
              <small className={styles.error}>{error.genre}</small>
            </label>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {input.petImage ? (
                <img
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                  }}
                  alt='pet'
                  src={URL.createObjectURL(input.petImage)}
                />
              ) : null}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <label className={styles.file}>
                  Imagen
                  <input
                    style={{ display: 'none' }}
                    type='file'
                    onChange={e => handleChangeImg(e)}
                    accept='.png, .jpg'
                  />
                </label>
                <small
                  style={{
                    fontSize: '12px',
                  }}
                  className={error.petImage ? styles.error : ''}>
                  {error.petImage
                    ? error.petImage
                    : input.petImage
                    ? 'Archivo Seleccionado'
                    : ''}
                </small>
              </div>
            </div>

            <label>
              Fecha
              <input
                name='date'
                type='date'
                value={input.date}
                onChange={e => handleChange(e)}
                max={maxDate()}
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
                value={input.description}
                name='description'
                onChange={e => handlerdescritionchange(e.target.value)}
              />
              <small className={styles.error}>{error.description}</small>
            </label>
          </div>
        ) : (
          <>
            <LocationMap />
          </>
        )}
      </div>
      <Button disabled={loading} className={styles.submit} type='submit'>
        {loading ? (
          <SpinnerCircular
            style={{ alignSelf: 'center' }}
            size='40'
            color='white'
          />
        ) : !step ? (
          'Siguiente'
        ) : (
          'Publicar'
        )}
      </Button>
    </form>
  );
}
