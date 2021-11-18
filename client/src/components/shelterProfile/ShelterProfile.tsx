import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostType } from '../../redux/types/types'
import getPostsUser from '../../services/getPostsUser'
import Typography from '@mui/material/Typography'
import { useHistory, useParams } from 'react-router'
import Post from '../Post'
import axios from 'axios'
import { Box } from '@mui/system'
import { Avatar } from '@mui/material'

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
  }

  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [user, setUser] = useState<userario>()
  const [posts, setPosts] = useState<PostType>()

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
    console.log(user)
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
          <Typography sx={{ fontSize: '0.9rem' }}>
            telefono: {user.phone ? user.phone : 'no tiene numero de telefono'}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            email: {user.username}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            facebook:{' '}
            {user.facebook ? (
              <a href={user.facebook}>facebook</a>
            ) : (
              'no se proporciono un facebook'
            )}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            instagram:{' '}
            {user.instagram ? (
              <a href={user.instagram}>instagram</a>
            ) : (
              'no se proporciono un instagram'
            )}
          </Typography>
          <Typography sx={{ fontSize: '0.9rem' }}>
            pagina web:{' '}
            {user.website ? (
              <a href={user.website}>pagina web</a>
            ) : (
              'no se proporciono una pagina web'
            )}
          </Typography>
        </Box>
      </Box>
    )
  } else {
    return <div></div>
  }
}
