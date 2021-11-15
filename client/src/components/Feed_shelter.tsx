import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import dotenv from 'dotenv';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      textShadow: '0 0 10px black',
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

interface shelter {
  name: string;
  _id: string;
  description: string;
  username: string;
  profileImage: { url: string; _id: string };
}

export default function FeedShelter() {
  const [shelters, setShelters] = useState<shelter[]>();

  useEffect(() => {
    const getShelters = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API}user/shelters`);
      setShelters(res.data);
    };
    getShelters();
  }, []);

  if (shelters) {
    if (shelters.length) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            minWidth: 300,
            width: '100%',
          }}>
          {shelters.map(item => {
            return (
              <Link to={`/home/shelters/details/${item._id}`}>
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
                      backgroundImage: `url(${item.profileImage.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
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
                      {`${item.name}`}
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
                      {`Nombre: ${item.username}`}
                    </Typography>
                  </Image>
                </ImageButton>
              </Link>
            );
          })}
        </Box>
      );
    } else {
      return (
        <div
          className='loading'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img
            src='https://themebeyond.com/html/petco/img/preloader.gif'
            alt='cargando'
            draggable='false'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '15vh',
              width: '15vw',
            }}
          />
          <br />
          <h2 style={{ color: '#8CCDFE', userSelect: 'none' }}>Cargando...</h2>
          <br />
          <img
            src='https://themebeyond.com/html/petco/img/preloader.gif'
            alt='Cargando...'
            draggable='false'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '15vh',
              width: '15vw',
            }}
          />
        </div>
      );
    }
  } else {
    return <div>No refugios</div>;
  }
}
