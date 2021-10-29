import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import style from './Footer.module.css'


export default function ButtonAppBar() {
  return (
    <Box className={style.footer}>
      <AppBar position="static">
          <Toolbar  sx={{
                          display: {
                            xs: 'flex',
                            justifyContent: 'center',
                          },
                          height:50
                         }}>
                <IconButton  href='https://github.com/Martintribuzio/huellitas-pg' size='large' color='inherit'>
              <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}