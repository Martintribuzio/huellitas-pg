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

export default function PrimarySearchAppBar(): JSX.Element {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

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
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}>
            <Link className={s.link} to='/' style={{ color: 'white' }}>
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
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '-webkit-fill-available',
              justifyContent: 'center',
            }}>
            <div
              style={{
                width: '-webkit-fill-available',
                display: 'flex',
                justifyContent: 'center',
              }}>
                  <Link className={s.link} to='/lost'>
              <Button
                style={{ margin: '5px', width: '20%' }}
                size='small'
                color='secondary'
                variant='contained'>
                perdidos
              </Button>
            </Link>
              <Link className={s.link} to='/found'>
              <Button
                style={{ margin: '5px', width: '20%' }}
                size='small'
                color='secondary'
                variant='contained'>
                encontrados
              </Button>
            </Link>
              <Link className={s.link} to='/adoption'>
              <Button
                style={{ margin: '5px', width: '20%' }}
                size='small'
                color='secondary'
                variant='contained'>
                en adopcion
              </Button>
            </Link>
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            //faltan botones para el menu de celular
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'>
              <Badge badgeContent={0} color='error'>
              <Link to='/menssage' style={{ color: 'white' }}>
                <MailIcon />
              </Link>
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'>
              <Badge badgeContent={0} color='error'>
              <Link to='/notification' style={{ color: 'white' }}>
                <NotificationsIcon  />
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
              <Link to='/profile' style={{ color: 'white' }}>
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
    </Box>
  );
}
