import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import s from './NavBar.module.css';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Inbox from '../Messages/Messages';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPostByQuery } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(): JSX.Element {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
   const history = useHistory();

  const logoutService = async () => {
   
    try {
      const response: any = await axios.get(
        'http://localhost:3001/user/logout',
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success === true) {
        window.localStorage.setItem('name', '');
        window.localStorage.setItem('lastname', '');
        window.localStorage.setItem('email', '');
        window.localStorage.setItem('token', '');
        window.localStorage.setItem('userId', '');
      }
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = 'primary-search-account-menu';
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
          to='/home/menssage'
          style={{ textDecoration: 'none' }}
          onClick={handleMenuClose}>
          <Button>Ver todos los mensajes</Button>
        </Link>
      </Stack>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
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
        to='/home/menssage'
        className={s.link}
        style={{ color: 'black' }}
        onClick={handleMobileMenuClose}>
        <MenuItem>
          <IconButton
            size='large'
            aria-label='show 4 new mails'
            color='inherit'>
            <Badge badgeContent={0} color='error'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
      </Link>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'>
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <Link
          style={{ display: 'flex', color: 'black', textDecoration: 'none' }}
          to='/profile'>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );
  useEffect(() => {
    dispatch(getPostByQuery(search));
  }, [dispatch, search]);

  function handleChange(e: any) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit() {
    setSearch('');
  }

  return (
    <Box className={s.box} sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}>
            <Link className={s.link} to='/home' style={{ color: 'white' }}>
              <PetsIcon />
            </Link>
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              display: { overflow: 'inherit', xs: 'none', sm: 'block' },
            }}>
            Huellitas
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onSubmit={handleSubmit}
              onChange={handleChange}
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}>
            <Link className={s.link} to='/home/createPost'>
              {/* <Button
                style={{
                  margin: '5px',
                  width: '100%',
                  minWidth: '135px',
                  maxWidth: '150px',
                }}
                size='small'
                color='secondary'
                variant='contained'>
                <AddCircleIcon />
                Crear Post
              </Button> */}
            </Link>
          </Box>

          <Box
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
            }}>
            <IconButton>
              <Link to='/home/createPost'>
                <AddCircleIcon fontSize='large' color='secondary' />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              onClick={handleProfileMenuOpen}
              color='inherit'>
              <Badge badgeContent={0} color='error'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'>
              <Badge badgeContent={0} color='error'>
                <Link to='/home/notification' style={{ color: 'white' }}>
                  <NotificationsIcon />
                </Link>
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              color='inherit'>
              <Link to='/home/profile' style={{ color: 'white' }}>
                <AccountCircle />
              </Link>
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenssage}
      <button onClick={logoutService}>logout</button>
    </Box>
  );
}
