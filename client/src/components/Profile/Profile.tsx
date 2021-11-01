import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom';
import getPostsUser from '../../services/getPostsUser';
import Post from '../Post';
import { PostType } from '../../redux/types/types';
import useUser from '../../hooks/useUser';
import profile from '../../assets/profile.png';

interface User {
  name: string;
  lastname: string;
  username: string;
}

export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostType[]>([]);

  const [loading, result] = useUser();

  if (result === 'Unauthorized') {
    history.push('/');
  }

  const id = localStorage.getItem('userId');

  useEffect(() => {
    if (id) {
      getPostsUser(id).then(post => {
        setPosts(post);
      });
      let name = localStorage.getItem('name');
      let lastname = localStorage.getItem('lastname');
      let username = localStorage.getItem('email');

      const user = {
        name: name ? name : '',
        lastname: lastname ? lastname : '',
        username: username ? username : '',
      };
      setUser(user);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2%',
      }}>
      <Avatar sx={{ width: '10%', height: '10%' }} src={profile} />
      {user ? (
        <>
          <Typography variant='h4'>
            {user.name} {user.lastname}
          </Typography>
          <Typography variant='h6'>{user.username}</Typography>
        </>
      ) : (
        ''
      )}
      <Typography>Mis posts!</Typography>
      {posts.length ? (
        posts.map(post => <Post post={post}></Post>)
      ) : (
        <Typography>No hay posts</Typography>
      )}
    </Box>
  );
}
