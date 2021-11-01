import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions';
import Login from './Login/Login';
import Register from './Register/Register';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import img1 from '../assets/landingPageImg/img1.png';
import img2 from '../assets/landingPageImg/img2.png';
import img3 from '../assets/landingPageImg/img3.png';
import img4 from '../assets/landingPageImg/img4.png';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Switch from '@mui/material/Switch';
import React from 'react';
import useUser from '../hooks/useUser';

export default function LandingPage() {
  const [auth, setAuth] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, result] = useUser();
  if (result === 'Success') history.push('/home');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  console.log(auth);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'primary.main',
          minHeight: '100vh',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignContent: 'end',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              width: '100%',
              height: '10%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IconButton size='large' color='inherit' sx={{ ml: 2 }}>
              <Link to='/home' style={{ color: 'white' }}>
                <PetsIcon />
              </Link>
            </IconButton>
            <Typography
              variant='h5'
              noWrap
              component='div'
              color='white'
              sx={{
                display: { overflow: 'inherit', xs: 'none', sm: 'block' },
              }}>
              Huellitas
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              width: '100%',
              height: '70%',
              marginBottom: '10%',
              marginLeft: '5%',
            }}>
            <Grid container spacing={0} columns={2}>
              <Grid item xs={1}>
                <img
                  style={{ width: '20vw', height: '20vw' }}
                  src={img3}
                  alt=''
                />
              </Grid>
              <Grid item xs={1}>
                <img
                  style={{ width: '20vw', height: '20vw' }}
                  src={img1}
                  alt=''
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} columns={2}>
              <Grid item xs={1}>
                <img
                  style={{ width: '20vw', height: '20vw' }}
                  src={img2}
                  alt=''
                />
              </Grid>
              <Grid item xs={1}>
                <img
                  style={{ width: '20vw', height: '20vw' }}
                  src={img4}
                  alt=''
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Container
          style={{
            borderTopLeftRadius: '5%',
            borderBottomLeftRadius: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0px',
            marginRight: '0px',
            backgroundColor: 'white',
            width: '60%',
          }}>
          <Switch checked={auth} onChange={handleChange} />{' '}
          <label>{auth ? 'Ya tengo cuenta' : '¿Necesitas una cuenta?'}</label>
          {auth ? <Register inicio={setAuth}/> : <Login />}
        </Container>
      </Box>
    );
  }
}
