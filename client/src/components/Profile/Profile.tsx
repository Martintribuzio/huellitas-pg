import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useHistory, Redirect } from 'react-router-dom';
import getPostsUser from '../../services/getPostsUser';
import Post from '../Post';
import { PostType } from '../../redux/types/types';
import useUser from '../../hooks/useUser';
import profile from '../../assets/profile.png';
import deletePostService from '../../services/deletePost';
import Button from '@mui/material/Button';


interface User {
  name: string;
  lastname: string;
  username: string;
  image: string;
}

export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<PostType[]>([]);
  // const [isOpen, openModal, closeModal] = useModal();
  // let [isModal, setIsModal] = useState(false)
  
  // const toggleModal = function(){
  //   setIsModal(isModal = !isModal)
  // }

  //console.log(isModal)

  const [result] = useUser();

  if (result === 'Unauthorized') {
    history.push('/login');
  }

  const id = localStorage.getItem('userId');

  const handleClick = (id: string | undefined) => {
    deletePostService(id);
    setPosts(posts.filter(post => post._id !== id));
  };

  useEffect(() => {
    if (id) {
      getPostsUser(id).then(post => {
        setPosts(post);
      });
      let name = localStorage.getItem('name');
      let lastname = localStorage.getItem('lastname');
      let username = localStorage.getItem('email');
      let image = localStorage.getItem('image');

      const user = {
        name: name ? name : '',
        lastname: lastname ? lastname !=="undefined" ? lastname : '' : '',
        username: username ? username : '',
        image: image ? image : profile,
      };
      setUser(user);
    }
  }, [id]);
  return result === 'Unauthorized' ? (
    <Redirect to='/login' />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0 ',
        minHeight: '71vh',
      }}>
      {user ? (
        <>
          <Avatar sx={{ width: '96px', height: '96px' }} src={user.image} />
          <Typography variant='h4'>
            {user.name} {user.lastname}
          </Typography>
          <Typography variant='h6'>{user.username}</Typography>
          <Typography>Mis posts!</Typography>
          {Array.isArray(posts) ? (
            posts.map(post => {
              return (
                <div>
                  <Post post={post}></Post>
                  {/* <button
                    onClick= {toggleModal}>
                    {' '}
                    editar
                  </button> */}
                  {/* <Modal isOpen={isModal} closeModal={closeModal}>
                    <PostAPet isOpen={isModal} closeModal={closeModal} />
                  </Modal> */}
                  <Button
                    variant='contained' 
                    onClick={() => handleClick(post._id)}>
                    {' '}
                    eliminar
                  </Button>
                </div>
              );
            })
          ) : (
            <Typography>No hay posts</Typography>
          )}
        </>
      ) : (
        ''
      )}
    </Box>
  );
}
