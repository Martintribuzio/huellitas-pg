import { useEffect } from 'react';
import { PostType,conversation } from '../../redux/types/types';
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
import { style } from '@mui/system';
import axios  from 'axios';
import useUser from '../../hooks/useUser';

export default function ImgMediaCard() {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  const history = useHistory();
  const [loading, result] = useUser();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  let detailpost = allPosts.find((elem: PostType) => elem._id === id);
  const contact = async () => {
    if(result !== 'Unauthorized'){
    const idSender = localStorage.getItem('userId');
    if(detailpost){
        const conver:conversation = (await axios.get(`/conversation?ida=${idSender}&idb=${detailpost.user}`)).data[0];
        if(conver._id){
          history.push(`/home/messenger/${conver._id}`);
        }
        else{
          const newConver: conversation = (await axios.post('/conversation',{
            idRec: detailpost.user,
            idEnv: idSender,
          })).data;
          console.log('NEW COVER',newConver);
          history.push(`/home/messenger/${newConver._id}`)
        }
  }
}
}

  if (detailpost !== undefined) {
    console.log('DETAIL POST', detailpost)
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
            image={`${process.env.REACT_APP_API}/${detailpost.petImage}`}
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
              Genero: {capitalize(detailpost.genre)}
            </Typography>
            {/* <Typography gutterBottom variant='h6' component='div'>
              Fecha de publicacion: {capitalize(detailpost.date)}
            </Typography> */}
            <Typography variant='body1' color='text.secondary'>
              {detailpost.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={contact}  size='small'>Contactar</Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
