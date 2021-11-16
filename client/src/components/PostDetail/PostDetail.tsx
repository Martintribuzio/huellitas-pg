import { useEffect, useState } from 'react';
import { PostType, conversation } from '../../redux/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { typeState } from '../../redux/reducers/index';
import { getPosts } from '../../redux/actions';
import { useHistory, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import capitalize from '@mui/utils/capitalize';
import axios from 'axios';
import useUser from '../../hooks/useUser';
import { Modal } from '../Modal';
import EditPost from '../../components/EditPost';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';

export default function ImgMediaCard() {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  const history = useHistory();
  const [result] = useUser();
  const idSender = localStorage.getItem('userId');

  const [report, setReport] = useState<number>(0);
  let [isModal, setIsModal] = useState(false);

  const toggleModal = function () {
    setIsModal((isModal = !isModal));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, isModal]);

  const handleCounter = async function () {
    let counter: any = await axios.put(`/post/report?id=${id}`);
    console.log(counter.data.reportCounter);
    setReport(counter.data.reportCounter);
    alert(
      'esta publicacion fue reportada varias veces, será revisada por nuestros superiores maestros del kung fu'
    );
    history.push('/home/feed'); //santi ponele estilos
  };

  let detailpost = allPosts.find((elem: PostType) => elem._id === id);
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
        {report > 0 ? <span>Reportado CHAN CHAN CHAN</span> : null}
        <Card
          elevation={5}
          sx={{
            maxWidth: 345,
            minWidth: '20vw',
            marginTop: 45,
            marginBottom: 54,
          }}>
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
              <Typography
                sx={{ textAlign: 'center' }}
                gutterBottom
                variant='h4'
                component='div'>
                {detailpost.name}
              </Typography>
            ) : null}
            <Typography gutterBottom variant='h5' component='div'>
              Tipo: {capitalize(detailpost.type)}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              Estado: {capitalize(detailpost.state)}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              Género: {capitalize(detailpost.genre)}
            </Typography>
            {/* <Typography gutterBottom variant='h6' component='div'>
              Fecha de publicacion: {capitalize(detailpost.date)}
            </Typography> */}
            <Typography variant='body1' color='text.secondary'>
              {detailpost.description}
            </Typography>
          </CardContent>
          {detailpost.user !== idSender ? (
            <>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={contact} size='small'>
                  Contactar
                </Button>
              </CardActions>
              <FormControl sx={{ m: 1, minWidth: '12vw' }}>
                <InputLabel>Reportar</InputLabel>
                <Select label='Reportar' onChange={handleCounter}>
                  <MenuItem value='Spam'>Spam</MenuItem>
                  <MenuItem value='Contenido Inapropiado'>
                    Contenido Inapropiado
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <div>
              <Button
                sx={{ marginBottom: '10px' }}
                variant='contained'
                onClick={toggleModal}>
                editar
              </Button>
              <Modal isOpen={isModal} closeModal={toggleModal}>
                <EditPost />
              </Modal>
            </div>
          )}
        </Card>
      </div>
    );
  } else {
    return <>Cargando...</>;
  }
}
