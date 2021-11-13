import { useSelector, useDispatch } from 'react-redux';
import { PostType } from '../redux/types/types';
import { useEffect } from 'react';
import { typeState } from '../redux/reducers/index';
import { getPosts } from '../redux/actions';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import styles from '../CSS/EditAPet.module.css';

export default function EditPost() {
  const { id } = useParams<{ id?: string }>();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  const dispatch = useDispatch();

  function handleChangeFoto() {}

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let detailpost = allPosts.find((elem: PostType) => elem._id === id);

  if (detailpost !== undefined) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card
          className={styles.form}
          elevation={5}
          sx={{
            borderRadius: '30px',

            paddingLeft: '37%',
            paddingRight: '37%',
          }}>
          <Button onClick={handleChangeFoto}>editar foto</Button>
          <CardMedia
            component='img'
            alt={detailpost.type}
            sx={{
              maxHeight: 300,
            }}
            image={`${detailpost.petImage.url}`}
          />

          <CardContent>
            {detailpost.name ? (
              <Typography gutterBottom variant='h6' component='div'>
                {' '}
                Nombre:
                <TextField defaultValue={detailpost.name}>
                </TextField>
              </Typography>
            ) : null}

            <Typography gutterBottom variant='h5' component='div'>
              Tipo:{' '}
              <select>
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
              <select>
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
              <select>
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
              <TextField defaultValue={detailpost.description}>
              </TextField>
            </Typography>

            <Button>Guardar</Button>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <>Cargando...</>;
  }
}
