import { useEffect } from 'react';
import { PostType } from '../../redux/types/types';
import { useDispatch, useSelector } from 'react-redux';
import { typeState } from '../../redux/reducers/index';
import { getPosts } from '../../redux/actions';
import { useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import capitalize from "@mui/utils/capitalize";

export default function ImgMediaCard() {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);

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
          maxHeight: '90vh',
        }}>
        <Card elevation={5} sx={{ maxWidth: 345, minWidth:'20vw', marginTop:50,marginBottom:50 }}>
          <CardMedia
            component='img'
            alt={detailpost.type}
            sx={{
              maxHeight:300,
            }}
            image={`http://localhost:3001/${detailpost.petImage}`}
          />
          <CardContent>
            {detailpost.name ? (
              <Typography sx={{textAlign:'center'}} gutterBottom variant='h4' component='div'>
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
            <Typography variant='body1' color='text.secondary'>
              {detailpost.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='small'>Contactar</Button>
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}
