import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import style from './Footer.module.css';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default function ButtonAppBar(props: any) {
  const { location } = props;
  if (location.pathname.match('/home/messenger')) {
    return null;
  } else {
    return (
        <Box className={style.footer}>
          <AppBar
            position='static'
            sx={{
              height: '20vh',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'RGB(112, 112 , 112)',
            }}>
              <div>
            <StyledToolbar>
              <section className={style.hue}>
                <IconButton
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='open drawer'
                  sx={{ mr: 2 }}>
                  <Link to='/home' style={{ color: 'white' }}>
                    <PetsIcon />
                  </Link>
                </IconButton>
                <Typography className={style.name} variant='h6'>
                  Huellitas
                </Typography>
              </section>
              <section>
              <Typography className={style.text} variant='body2' color='white'>
                © Huellitas 2021 — Todos los derechos reservados
              </Typography>
                <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3px'}}>
                  <Typography className={style.text} variant='body2' color='lightgray'>
                      ¿Nos ayudás a mantener la web en funcionamiento?
                  </Typography>
                  <IconButton
                      href='https://huellitas.vercel.app/home/donate'
                      size='small'
                      color='inherit'>
                      <MonetizationOnIcon />
                  </IconButton>
                  </Box>
              </section>
              <IconButton
                href='https://github.com/Martintribuzio/huellitas-pg'
                size='large'
                color='inherit'
                target='_blank'>
                <GitHubIcon />
              </IconButton>
            </StyledToolbar>
          </div>
          </AppBar>
        </Box>
    );
  }
}
