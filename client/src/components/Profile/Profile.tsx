import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Profile() {
  var profile = {
    name: 'santi',
    lastname: 'pk',
    profilePicture: 'https://avatars1.githubusercontent.com/u/527058?s=460&v=4',
    posts: [],
    username: 'santieldk@gmail.com',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2%',
      }}>
      <Avatar
        sx={{ width: '10%', height: '10%' }}
        src={profile.profilePicture}
      />
      <Typography>
        {profile.name} {profile.lastname}
      </Typography>
    </Box>
  );
}
