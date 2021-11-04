import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions';
import Login from './Login/Login';
import Register from './Register/Register';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import img1 from '../assets/home/pets2.png';

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
      <Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
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
              <img src={img1} alt=' ' />
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
            <label style={{ marginBottom: '10px' }}>
              {auth ? 'ya tengo cuenta' : 'necesitas una cuenta?'}
            </label>
            {auth ? <Register /> : <Login />}
          </Container>
        </Box>
        <Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              backgroundColor: 'primary.main',
              minHeight: '100vh',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                maxHeight: 'max-content',
                width: '10vw',
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
                    display: { overflow: 'inherit', xs: 'block', sm: 'block' },
                  }}>
                  Huellitas
                </Typography>
              </Box>
            </Box>
            <Container
              style={{
                height: '95vh',
                borderTopLeftRadius: '5%',
                borderTopRightRadius: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0px',
                marginRight: '0px',
                backgroundColor: 'white',
              }}>
              <Switch checked={auth} onChange={handleChange} />{' '}
              <label style={{ marginBottom: '10px' }}>
                {auth ? 'ya tengo cuenta' : 'necesitas una cuenta?'}
              </label>
              {auth ? <Register /> : <Login />}
            </Container>
          </Box>
        </Box>
      </Box>
    );
  }
}
