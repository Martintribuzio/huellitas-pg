import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../redux/actions';
import { typeState } from '../redux/reducers/index';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import dotenv from 'dotenv';
import gif from '../images/dog-cute.gif'
dotenv.config();

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,

  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },
    '& .state': {
      display: 'none',
    },
    '& .name': {
      display: 'block',
    },
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

export default function Feed(props: any) {
  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => state.filteredPosts);
  let queryPost = useSelector((state: typeState) => state.queryPosts);

  let postsToShow = queryPost
    ? allPosts.filter(elem =>
        elem.name?.toLowerCase().includes(queryPost.toLowerCase())
      )
    : allPosts;

  useEffect(() => {
    if (!props.isOpen) dispatch(getPosts());
  }, [dispatch, props.isOpen]);

  if (allPosts.length) {
    if (postsToShow.length) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minWidth: 300,
            width: '100%',
          }}
          > 
          {postsToShow.map(item => {
            return (
              <Link key={item._id} to={`/home/detail/${item._id}`}>
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
                      backgroundImage: `url(${item.petImage?.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'botton',
                    }}
                  />
                  <ImageBackdrop className='MuiImageBackdrop-root' />
                  <Image>
                    <Typography
                      component='span'
                      variant='subtitle1'
                      className='state'
                      color='inherit'
                      sx={{
                        position: 'relative',
                        p: 5,
                        pt: 2,
                        pb: theme => `calc(${theme.spacing(1)} + 6px)`,
                      }}>
                      {`${item.state}`}
                    </Typography>
                  </Image>
                  <Image>
                    <Typography
                      component='span'
                      variant='subtitle1'
                      display='none'
                      className='name'
                      color='inherit'
                      sx={{
                        position: 'relative',
                        p: 5,
                        pt: 2,
                        pb: theme => `calc(${theme.spacing(1)} + 6px)`,
                      }}>
                      {item.name ? `Nombre: ${item.name}` : `${item.state}`}
                    </Typography>
                  </Image>
                </ImageButton>
              </Link>
            );
          })}
        </Box>
      );
    } else {
      return <h1>No hay publicaciones disponibles</h1>;
    }
  } else {
    return (
      <div
        className='loading'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img
          src={gif}
          alt='cargando'
          draggable='false'
        />
        <br />
        <h2 style={{ color: '#8CCDFE', userSelect: 'none' }}>Cargando...</h2>
      </div>
    );
  }
}
