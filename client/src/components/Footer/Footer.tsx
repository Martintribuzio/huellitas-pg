import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import style from './Footer.module.css'
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent:'space-between'
}));
export default function ButtonAppBar() {
  return (
    <Box className={style.footer}>
      <AppBar position="static">
          <StyledToolbar >
            <section className={style.hue}>
            <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}>
            <Link  to='/home' style={{ color: 'white' }}>
              <PetsIcon />
            </Link>
          </IconButton>
            <Typography className={style.name}  variant='h6'>
               Huellitas
            </Typography>
            </section>
             <Typography className={style.text} variant='body2' color='text.secondary'>
             © Huellitas 2021 — Todos los derechos reservados
             </Typography>
            <IconButton href='https://github.com/Martintribuzio/huellitas-pg' size='large' color='inherit'>
              <GitHubIcon />
            </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}