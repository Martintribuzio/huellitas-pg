import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar  sx={{
              display: {
                xs: 'flex',
                justifyContent: 'center',
              },
              height:'max-content'
            }}>
      <IconButton  href='https://github.com/Martintribuzio/huellitas-pg' size='large' color='inherit'>
            <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  );
}