import { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPosts } from '../redux/actions'
import Login from './Login/Login'
import RegistersContainer from './Register/RegistersContainer'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import img1 from '../assets/home/pets2.png'
import SwitchCustom from '../components/Login/Switch'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import React from 'react'
import useUser from '../hooks/useUser'
import background from '../assets/home/background.png'

export default function LandingPage() {
  const [auth, setAuth] = React.useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  console.log(location)

  const [result, loading] = useUser()
  if (result === 'Success') history.push('/home/feed')

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/login') {
      setAuth(false)
    } else {
      setAuth(true)
    }
  }, [])

  if (loading) {
    return <div>Cargando...</div>
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
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                width: '100%',
                height: '10%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <IconButton size='large' color='inherit' sx={{ ml: 2 }}>
                <Link
                  to='/home'
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <PetsIcon />
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
                </Link>
                </IconButton>
              <Typography variant='h6' color='white'>
                Marcando el camino a casa.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                height: '70%',
              }}>
              <img
                style={{ width: '90%', alignSelf: 'center' }}
                src={img1}
                alt=' '
              />
            </Box>
          </Box>

          <Container
            style={{
              backgroundImage: `url(${background})`,
              borderTopLeftRadius: '5%',
              borderBottomLeftRadius: '5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '0px',
              marginRight: '0px',
              backgroundColor: '#F5F5F5',
              width: '60%',
            }}>
            <SwitchCustom
              onColor='#F5F5F5'
              isOn={auth}
              handleToggle={() => setAuth(!auth)}
              label1='Iniciar Sesión'
              label2='Regístrarse'
            />
            {/* <Switch checked={auth} onChange={handleChange} /> */}
            {/* <label style={{ marginBottom: '10px' }}>
              {auth ? 'Ya tengo cuenta' : '¿Necesitas una cuenta?'}
            </label> */}
            {auth ? <RegistersContainer /> : <Login />}
          </Container>
        </Box>
        <Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              backgroundColor: 'primary.main',
              minHeight: '100vh',
              justifyContent: 'center',
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
                backgroundImage: `url(${background})`,
                minHeight: '94vh',
                borderTopLeftRadius: '5%',
                borderTopRightRadius: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0px',
                marginRight: '0px',
                backgroundColor: '#F5F5F5',
              }}>
              <SwitchCustom
                onColor='#F5F5F5'
                isOn={auth}
                handleToggle={() => setAuth(!auth)}
                label1='Iniciar Sesión'
                label2='Regístrarse'
              />
              {/* <Switch checked={auth} onChange={handleChange} />{' '}
              <label style={{ marginBottom: '10px' }}>
                {auth ? 'Ya tengo cuenta' : '¿Necesitas una cuenta?'}
              </label> */}
              {auth ? <RegistersContainer /> : <Login />}
            </Container>
          </Box>
        </Box>
      </Box>
    )
  }
}
