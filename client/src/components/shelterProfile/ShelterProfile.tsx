import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostType } from '../../redux/types/types';
import getPostsUser from '../../services/getPostsUser';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from 'react-router';
import Post from '../Post';
import axios from 'axios';

export default function ShelterProfile() {
  interface imagen{
    _id:string,
    name:string,
    url:string,
  }

  interface userario {
    id:string,
    name:string,
    description:string,
    profileImage:imagen,
    username:string,
    address:string,
    phone:string,
    posts:Array<PostType>,
  }

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [user, setUser] = useState<userario>()
  const [posts,setPosts] = useState<PostType>()

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
  
  

  if(user){
  return (
    <div>
      <img src={user.profileImage?.url} />
      <h1>{user.name}</h1>
      <h2>{user.username}</h2>
      <h2>{user.address}</h2>
      <h2>{user.description}</h2>
      {Array.isArray(user.posts) ? (
            user.posts.map((post:PostType) => {
              return (
                <div>
                  <Post post={post}></Post>
                </div>
              );
            })
          ) : (
            <Typography>No hay posts</Typography>
          )}
    </div>
  );
  }else{
    return(
      <div>

      </div>
    )
  }
}
