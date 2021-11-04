import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import style from './Messenger.module.css'


const messages = [
  {
    id: 1,
    primary: 'Se me perdió el perro',
    secondary: "Viste mi perro viejo?",
    person: '/static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'No re loco el perro',
    secondary: 'el perro estaba volando re loco cuando lo vi! parecia superman',
    person: '/static/images/avatar/1.jpg',
  },
  {
      id:3,
      primary:'tuki tuki tuki',
      secondary:'tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki tuki',
      person: 'data:image/jpeg;base64,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'
  }
];

export default function BottomAppBar() {
  
  return (
    <div className={style.dviMens}>
      <CssBaseline />
      <Paper elevation={0} sx={{ pb: '50px'}}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Mensajes
        </Typography>
        
        <List sx={{ mb: 2 }}>
          {messages.slice(0,5).map(({ id, primary, secondary, person }) => (
              <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Hoy
                </ListSubheader>
              )}
              {id === 3 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  Este mes
                </ListSubheader>
              )}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary.length < 50? secondary:`${secondary.slice(0,50)}...`}  />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );
}