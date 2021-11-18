import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import PetsIcon from '@mui/icons-material/Pets'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'
import s from './NavBar.module.css'
import Button from '@mui/material/Button'
import Inbox from '../conversations/Conversations'
import Stack from '@mui/material/Stack'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import useUser from '../../hooks/useUser'
import axios from 'axios'
import InfoIcon from '@mui/icons-material/Info'
import { conversation } from '../../redux/types/types'
import { typeState } from '../../redux/reducers/index'
import { message } from '../Messages/Message'
import HomeIcon from '@mui/icons-material/Home'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function PrimarySearchAppBar(): JSX.Element {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorElProf, setAnchorElProf] = React.useState<null | HTMLElement>(
    null
  )
  const isMenuOpen = Boolean(anchorEl)
  const isMenuOpenProf = Boolean(anchorElProf)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const history = useHistory()
  const [result] = useUser()
  const [notificacion, setNotificacion] = useState<number>(0)
  const convers: Array<conversation> = useSelector(
    (state: typeState) => state.conversations
  )
  const id = localStorage.getItem('userId')

  useEffect(() => {
    if (Array.isArray(convers)) {
      const getMessages = async () => {
        let promise = convers.map(c => axios.get(`/message/${c._id}`))
        let states = (await Promise.all(promise))
          .map(r => r.data)
          .map(c =>
            c.reduce(
              (acc: number, m: message) =>
                m.state === 'unread' && m.sender !== id ? acc + 1 : acc,
              0
            )
          )
          .reduce((acc: number, cur: number) => acc + cur, 0)
        setNotificacion(states)
      }
      getMessages()
    }
  }, [result, convers, mobileMoreAnchorEl, anchorEl, anchorElProf, id])
  const logoutService = async () => {
    try {
      const response: any = await axios.get('/user/logout', {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      })
      if (response.data.success === true) {
        window.localStorage.setItem('name', '')
        window.localStorage.setItem('lastname', '')
        window.localStorage.setItem('email', '')
        window.localStorage.setItem('token', '')
        window.localStorage.setItem('userId', '')
        window.localStorage.setItem('image', '')
      }
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleProfileMenuOpenProf = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProf(event.currentTarget)
  }
  const handleMenuCloseProf = () => {
    setAnchorElProf(null)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenssage = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <Inbox />
      <Stack direction='row' justifyContent='center'>
        <Link
          to='/home/messenger'
          style={{ textDecoration: 'none' }}
          onClick={handleMenuClose}>
          <Button>Ver todos los mensajes</Button>
        </Link>
      </Stack>
    </Menu>
  )
  const renderMenu = (
    <Menu
      anchorEl={anchorElProf}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpenProf}
      onClose={handleMenuCloseProf}>
      <Link
        to='/home/profile'
        style={{ textDecoration: 'none', color: 'black' }}>
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      </Link>

      {result === 'Unauthorized' ? null : (
        <MenuItem onClick={logoutService}>
          <IconButton
            onClick={logoutService}
            size='small'
            aria-controls={menuId}
            color='inherit'>
            <LogoutIcon />
          </IconButton>
          Cerrar sesión
        </MenuItem>
      )}
    </Menu>
  )
  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <Link
        to='/home/messenger'
        className={s.link}
        style={{ color: 'black' }}
        onClick={handleMobileMenuClose}>
        <MenuItem>
          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'>
            <Badge badgeContent={notificacion} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Mensajes</p>
        </MenuItem>
      </Link>
      <MenuItem>
        <Link
          style={{ display: 'flex', color: 'black', textDecoration: 'none' }}
          to='/home/profile'>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Perfil</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={logoutService}>
        <IconButton
          onClick={logoutService}
          size='small'
          aria-controls={menuId}
          color='inherit'>
          <LogoutIcon />
        </IconButton>
        Cerrar sesión
      </MenuItem>
    </Menu>
  )

  return (
    <Box className={s.box} sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ height: '9vh', display: 'flex', justifyContent: 'center' }}>
        <Toolbar>
          <Link className={s.link} to='/home' style={{ color: 'white' }}>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}>
              <PetsIcon />
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  display: {
                    overflow: 'inherit',
                    xs: 'none',
                    sm: 'block',
                    marginLeft: '10px',
                  },
                }}>
                Huellitas
              </Typography>
            </IconButton>
          </Link>

          <Box
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}>
            <IconButton>
              <Link to='/home/createPost'>
                {/* <AddCircleIcon fontSize='large' color='secondary'/> */}
              </Link>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>
              <Button className={s.btnNav} color='inherit'>
                Inicio
              </Button>
            </Link> */}
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/feed'>
              <Button className={s.btnNav} color='inherit'>
                Publicaciones
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/shelters'>
              <Button className={s.btnNav} color='inherit'>
                Refugios
              </Button>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/about'>
              <Button className={s.btnNav} color='inherit'>
                Nosotros
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/feed'>
              <IconButton sx={{ mr: 2 }} color='inherit'>
                <FavoriteBorderIcon />
              </IconButton>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/shelters'>
              <IconButton sx={{ mr: 2 }} color='inherit'>
                <HomeIcon />
              </IconButton>
            </Link>
            <Link
              style={{ textDecoration: 'none', color: 'white' }}
              to='/home/about'>
              <IconButton sx={{ mr: 2 }} color='inherit'>
                <InfoIcon />
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {result === 'Success' ? (
            <Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  onClick={handleProfileMenuOpen}
                  color='inherit'>
                  <Badge badgeContent={notificacion} color='error'>
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpenProf}
                  color='inherit'>
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Link style={{ textDecoration: 'none' }} to='/login'>
              {/* <Button
                color='secondary'
                variant='contained'
                sx={{ color: '#73A7CB' }}>
                Registrate
              </Button> */}
              <Button
                variant='contained'
                color='secondary'
                style={{ width: '7vw', minWidth: '90px', color: '#73A7CB' }}>
                Empezar
              </Button>
            </Link>
          )}
          {/* <button onClick={logoutService}>logout</button> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMobileMenu}
      {renderMenssage}
    </Box>
  )
}
