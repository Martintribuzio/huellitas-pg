import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions';
import Title from './Title/Title';
import Login from './Login/Login';
import Register from './Register/Register';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import img1 from '../assets/landingPageImg/img1.png';
import img2 from '../assets/landingPageImg/img2.png';
import img3 from '../assets/landingPageImg/img3.png';
import img4 from '../assets/landingPageImg/img4.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

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
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'end',
        }}>
        <Box
          sx={{
            width: '100%',
            height: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Title />
          <Link style={{ textDecoration: 'none', color: 'white' }} to={'/home'}>
            <Button size='medium' color='secondary' variant='contained'>
              HOME
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '40%',
            marginBottom: '5%',
            marginLeft: '5%',
          }}>
          <Grid container spacing={0} columns={2}>
            <Grid item xs={1}>
              <img
                style={{ width: '200px', height: '200px' }}
                src={img1}
                alt=''
              />
            </Grid>
            <Grid item xs={1}>
              <img
                style={{ width: '200px', height: '200px' }}
                src={img2}
                alt=''
              />
            </Grid>
          </Grid>
          <Grid container spacing={0} columns={2}>
            <Grid item xs={1}>
              <img
                style={{ width: '200px', height: '200px' }}
                src={img3}
                alt=''
              />
            </Grid>
            <Grid item xs={1}>
              <img
                style={{ width: '200px', height: '200px' }}
                src={img4}
                alt=''
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Container
        sx={{
          borderTopLeftRadius: '5%',
          borderBottomLeftRadius: '5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginLeft: '0px',
          marginRight: '0px',
          backgroundColor: 'white',
          width: '60%',
        }}>
        <Login />
        <Register />
      </Container>
    </Box>
  );
}
