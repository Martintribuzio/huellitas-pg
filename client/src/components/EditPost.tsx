import { useSelector } from 'react-redux';
import { PostType, conversation } from '../redux/types/types';
import {useState, ChangeEvent, MouseEvent } from 'react';
import { typeState } from '../redux/reducers/index';
import { useHistory, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import axios from 'axios';
import useUser from '../hooks/useUser';
import editPost from '../services/editPost';
import style from '../CSS/EditAPet.module.css';
import { Button } from '@mui/material';
import { validation } from '../helpers/validationPost';

export default function EditPost() {
  type event =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | ChangeEvent<HTMLSelectElement>;

  type mouseEvent = MouseEvent<HTMLButtonElement>;

  const initialError = {
    description: '',
    genre: '',
    date: '',
    petImage: '',
    type: '',
    state: '',
  };

  const { id } = useParams<{ id?: string }>();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  // const dispatch = useDispatch();
  const history = useHistory();
  const [loading, result] = useUser();
  const [error, setError] = useState(initialError);
  const idSender = localStorage.getItem('userId');

  let detailpost = allPosts.find((elem: PostType) => elem._id === id);

  const initialState = {
    _id: detailpost?._id,
    name: detailpost?.name,
    description: detailpost?.description,
    genre: detailpost?.genre,
    date: detailpost?.date,
    petImage: "",
    oldPetImage: detailpost?.petImage.url,
    type: detailpost?.type,
    state: detailpost?.state,
    latitude: detailpost?.latitude,
    longitude: detailpost?.longitude,
  };

  const [input, setInput] = useState<any>(initialState);

  //console.log(input.oldPetImage)

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  //funciones handle////////////////////////////////////////////////////////////

  function handleChangeFoto(e: Event | event) {
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

  const handlegenrechange = (e: event) => {
    setInput({ ...input, genre: e.target.value });
  };

  const handlerdescritionchange = (event: string) => {
    setInput({
      ...input,
      description: event,
    });
  };

  const handletypechange = (e: event) => {
    setInput({ ...input, type: e.target.value });
  };

  const handleSelectEstado = (e: event) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value as string,
    });
  };

  function handleChange(e: event) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: mouseEvent) {
    const errors = validation(input);
    if (Object.values(errors).every(error => error === '')) {
      const fd = new FormData();
      fd.append('state', input.state);
      fd.append('description', input.description);
      fd.append('type', input.type);
      fd.append('genre', input.genre);
      fd.append('_id', input._id);
      input.name && fd.append('name', input.name);
      input.petImage && fd.append('petImage', input.petImage);
      editPost(fd);
      return Swal.fire({
        title: 'Guardado!',
        text: 'Publicacion editada con exito!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    }
    setError(errors);
    return Swal.fire({
      title: 'Error!',
      text: 'La imagen ingresada no es valida',
      icon: 'error',
      confirmButtonText: 'Volver',
    });
  }
  //console.log(input)
  ///////////////////////////////////////////////////////////////////
  const contact = async () => {
    if (result !== 'Unauthorized') {
      if (detailpost) {
        const conver: conversation = (
          await axios.get(
            `/conversation?ida=${idSender}&idb=${detailpost.user}`
          )
        ).data[0];
        if (conver._id) {
          history.push(`/home/messenger/${conver._id}`);
        } else {
          const newConver: conversation = (
            await axios.post('/conversation', {
              idRec: detailpost.user,
              idEnv: idSender,
            })
          ).data;
          history.push(`/home/messenger/${newConver._id}`);
        }
      }
    }
  };

  if (detailpost !== undefined) {
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
           
        {input.petImage ? <CardMedia
            component='img'
            alt={detailpost.type}
            sx={{
              maxHeight: 300,
            }}
            image = {URL.createObjectURL(input.petImage)}
          />: input.oldPetImage ? <CardMedia
          component='img'
          alt={detailpost.type}
          sx={{
            maxHeight: 300,
          }}
          image = {input.oldPetImage}
          /> :  null}
          
          <CardContent>
            {detailpost.name ? (
              <Typography gutterBottom variant='h6' component='div'>
                {' '}
                Nombre:
                <input
                  name='name'
                  defaultValue={detailpost.name}
                  onChange={handleChange}></input>
              </Typography>
            ) : null}

            <Typography
              sx={{ display: 'flex', flexDirection: 'column' }}
              gutterBottom
              variant='h5'
              component='div'>
              Tipo:{' '}
              <select onChange={handletypechange}>
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
              <select onChange={handleSelectEstado} name='state'>
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
              <select onChange={handlegenrechange}>
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
                defaultValue={detailpost.description}
                onChange={e =>
                  handlerdescritionchange(e.target.value)
                }></textarea>
            </Typography>

            <Button variant='contained' onClick={handleSubmit}>
              Guardar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <>Cargando...</>;
  }
}
