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
import { useModal } from '../../hooks/useModal';
import EditPost from '../../components/EditPost';

export default function ImgMediaCard() {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  const history = useHistory();
  const [loading, result] = useUser();
  const idSender = localStorage.getItem('userId');

  let [isModal, setIsModal] = useState(false);
  const [isOpen, openModal, closeModal] = useModal();

  const toggleModal = function () {
    setIsModal((isModal = !isModal));
  };

  //console.log(isModal)

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, isModal]);


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
          <button onClick={toggleModal}>editar</button>
          <Modal isOpen={isModal} closeModal={toggleModal}>
            <EditPost />
          </Modal>
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
            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={contact} size='small'>
                Contactar
              </Button>
            </CardActions>
          ) : null}
        </Card>
      </div>
    );
  } else {
    return <>Cargando...</>;
  }
}
