import { useEffect, useState } from 'react'
import { PostType } from '../../redux/types/types'

import Typography from '@mui/material/Typography'
import { useParams } from 'react-router'
import Post from '../Post'
import axios from 'axios'
import { Box } from '@mui/system'
import { Avatar, IconButton } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import LanguageIcon from '@mui/icons-material/Language'

export default function ShelterProfile() {
  interface imagen {
    _id: string
    name: string
    url: string
  }

  interface userario {
    id: string
    name: string
    description: string
    profileImage: imagen
    username: string
    address: string
    phone: string
    posts: Array<PostType>
    facebook: string
    instagram: string
    website: string
    _id: string
  }

  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<userario>()

  // useEffect(() => {
  //   if (id) {
  //     getPostsUser(id).then(post => {
  //       setPosts(post);
  //     });
  //     let name = localStorage.getItem('name');
  //     let lastname = localStorage.getItem('lastname');
  //     let username = localStorage.getItem('email');
  //     let image = localStorage.getItem('image');

  //     const user = {
  //       name: name ? name : '',
  //       lastname: lastname ? lastname !=="undefined" ? lastname : '' : '',
  //       username: username ? username : '',
  //       image: image ? image : profile,
  //     };
  //     setUser(user);
  //   }
  // }, [id]);

  useEffect(() => {
    const getUser = async () => {
      const usuario = await axios.get(`/user/shelter?id=${id}`)
      setUser(usuario.data)
    }

    getUser()
  }, [])

  // const handleClick = (id: string | undefined) => {
  //   // deletePostService(id);
  //   // setUser(user.posts.filter(post => post.id !== id));
  // };

  if (user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '71vh',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar
            sx={{ width: '96px', height: '96px', marginTop: '20px' }}
            src={user.profileImage.url}
          />
          <Typography variant='h4'>{user.name}</Typography>
          <Typography variant='h6'>{user.address}</Typography>
          <Typography variant='h6'>{user.description}</Typography>
          <Typography variant='h6'>posts del refugio:</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20px',
            }}>
            {Array.isArray(user.posts) && user.posts.length > 0 ? (
              user.posts.map((post: PostType) => {
                return (
                  <div>
                    <Post post={post}></Post>
                  </div>
                )
              })
            ) : (
              <Typography variant='h6'>No hay posts</Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: '-webkit-fill-available',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '20px',
          }}>
          <Typography variant='h4' fontWeight='7000'>
            contacto:
          </Typography>
          <Typography variant='h6'>
            {' '}
            numero de telefono: {user.phone}
          </Typography>
          {user.instagram ? (
            <IconButton
              size='small'
              onClick={() => {
                window.open(user.website, '_blank')
              }}>
              <InstagramIcon
                onClick={() => {
                  window.open(user.instagram, '_blank')
                }}
              />
              <Typography variant='h6'>instagram</Typography>
            </IconButton>
          ) : null}
          {user.facebook ? (
            <IconButton
              size='small'
              onClick={() => {
                window.open(user.website, '_blank')
              }}>
              <FacebookIcon
                onClick={() => {
                  window.open(user.facebook, '_blank')
                }}
              />
              <Typography variant='h6'>facebook</Typography>
            </IconButton>
          ) : null}
          {user.website ? (
            <IconButton
              size='small'
              onClick={() => {
                window.open(user.website, '_blank')
              }}>
              <LanguageIcon />

              <Typography variant='h6'>website</Typography>
            </IconButton>
          ) : null}
        </Box>
      </Box>
    )
  } else {
    return <div></div>
  }
}
