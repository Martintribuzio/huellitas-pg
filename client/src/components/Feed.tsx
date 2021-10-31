import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/actions';
import { typeState } from '../redux/reducers/index';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },
    // "& .MuiImageMarked-root": {
    //   opacity: 1
    // },
    // "& .MuiTypography-root": {
    //   border: "4px solid currentColor"
    // }
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const TraslateState = (petState: String) => {
  switch (petState) {
    case 'found':
      return 'Encontrado';
    case 'lost':
      return 'Perdido';
    default:
      return 'En adopcion';
  }
};

export default function Feed() {
  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  let queryPost = useSelector((state: typeState) => state.queryPosts);
  console.log('QUERY POSTS', queryPost);

  let postsToShow = queryPost
    ? allPosts.filter(elem => elem.name?.toLowerCase().includes(queryPost.toLowerCase()))
    : allPosts;
  console.log('POSTS', postsToShow);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (postsToShow.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          minWidth: 300,
          width: '100%',
        }}>
        {postsToShow.map(item => {
          if (typeof item.petImage === 'string') {
            if (item.petImage.search(/\\/)) {
              item.petImage = item.petImage.replace(/\\/g, '/');
            }
          }
          return (
            <Link to={`/home/detail/${item._id}`}>
              <ImageButton
                focusRipple
                key={item.description}
                style={{
                  width: '30vw',
                  margin: '10px',
                }}
                sx={{ minHeight: 200, minWidth: 200 }}>
                <ImageSrc
                  style={{
                    backgroundImage: `url(http://localhost:3001/${item.petImage}`,
                  }}
                />
                <ImageBackdrop className='MuiImageBackdrop-root' />
                <Image>
                  <Typography
                    component='span'
                    variant='subtitle1'
                    color='inherit'
                    sx={{
                      position: 'relative',
                      p: 5,
                      pt: 2,
                      pb: theme => `calc(${theme.spacing(1)} + 6px)`,
                    }}>
                    {item.name
                      ? `${TraslateState(item.state)}, Nombre: ${item.name}`
                      : `${TraslateState(item.state)}`}
                  </Typography>
                </Image>
              </ImageButton>
            </Link>
          );
        })}
      </Box>
    );
  } else {
    return <h1>Cargando...</h1>;
  }
}
