import {useSelector, useDispatch} from 'react-redux';
import { PostType, conversation } from '../redux/types/types';
import { useEffect, useState} from 'react';
import { typeState } from '../redux/reducers/index';
import { getPosts } from '../redux/actions';
import { useHistory, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import capitalize from '@mui/utils/capitalize'; 
import axios from 'axios';
import useUser from '../hooks/useUser';
import { MenuItem, TextField } from '@mui/material';
import { Select } from '@mui/material';
import { AnyMessageParams } from 'yup/lib/types';

export default function EditPost(){
    
    const { id } = useParams<{ id?: string }>();
    let allPosts = useSelector((state: typeState) => state.filteredPosts);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, result] = useUser();
    const idSender = localStorage.getItem('userId');

    function handleChangeFoto(){
    
    }

    useEffect(() => {
        dispatch(getPosts());
      }, [dispatch]);

    let detailpost = allPosts.find((elem: PostType) => elem._id === id);

    
    const initialState = {
        name: detailpost?.name,
        description: detailpost?.description,
        genre: detailpost?.genre,
        date: detailpost?.date,
        petImage: detailpost?.petImage,
        type: detailpost?.type,
        state: detailpost?.state,
        latitude: detailpost?.latitude,
        longitude: detailpost?.longitude, 
    };
    

    const [input, setInput] = useState<any>(initialState);

    //console.log(input)
    
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
              maxHeight: '85vh',
            }}>
            <Card
              elevation={5}
              sx={{
                maxWidth: 345,
                minWidth: '20vw',
                marginTop: 45,
                marginBottom: 54,
              }}>
            <Button onClick = {handleChangeFoto}>editar foto</Button>
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
                <Typography gutterBottom variant='h6' component='div'> Nombre: 
                <TextField defaultValue = {detailpost.name}>
                  {/* <Typography
                    sx={{ textAlign: 'center' }}
                    gutterBottom
                    variant='h4'
                    component='div'>
                    {detailpost.name}
                  </Typography> */}
                </TextField>
                </Typography>
                ) : null}
                
                <Typography gutterBottom variant='h5' component='div'>
                  Tipo: <select>
                      <option hidden selected>{detailpost.type}</option>
                      <option value="Perro">perro</option>
                      <option value="Gato">gato</option>
                      <option value="Otro">otro</option>
                  </select>
                </Typography>

                <Typography gutterBottom variant='h6' component='div'>
                  Estado: <select>
                      <option hidden selected>{detailpost.state}</option>
                      <option value='Perdido'>Perdido</option>
                      <option value='Encontrado'>Encontrado</option>
                      <option value='Adopción'>En adopcion</option>
                  </select>
                </Typography>
                
                <Typography gutterBottom variant='h6' component='div'>
                  Género: <select>
                      <option hidden selected>{detailpost.genre}</option>
                      <option value='Macho'> Macho </option>
                      <option value='Hembra'> Hembra </option>
                  </select>
                </Typography>
                
                {/* <Typography gutterBottom variant='h6' component='div'>
                  Fecha de publicacion: {capitalize(detailpost.date)}
                </Typography> */}
                
                {/* <Typography variant='body1' color='text.secondary'>
                  {detailpost.description}
                </Typography> */}

                <Typography gutterBottom variant='h6' component='div'> Descripcion: 
                <TextField defaultValue = {detailpost.description}>
                  {/* <Typography
                    sx={{ textAlign: 'center' }}
                    gutterBottom
                    variant='h4'
                    component='div'>
                    {detailpost.name}
                  </Typography> */}
                </TextField>
                </Typography>

                <Button>Guardar</Button>

              </CardContent>
              {/* {detailpost.user !== idSender ? (
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={contact} size='small'>
                    Contactar
                  </Button>
                </CardActions>
              ) : null} */}
            </Card>
          </div>
        );
      } else {
        return <>Cargando...</>;
      }
}