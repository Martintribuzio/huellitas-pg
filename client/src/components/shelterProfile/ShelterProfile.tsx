import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions';
import { useHistory, useParams } from 'react-router';
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
    posts:Array<object>
  }

  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [shelter, setShelter] = useState();
  const [user, setUser] = useState<userario>()

  // useEffect(() => {
  //   dispatch(getUser(id));
  // }, [dispatch])
  
  useEffect(() => {
    const getUser = async () => {
      const usuario = await axios.get(`/user/shelter?id=${id}`)
      setUser(usuario.data)
    }
    getUser()
  }, [])
  
  const [shelterProfile, setShelterProfile] = useState(shelter);
  // console.log(user)
  
  if(user){
  return (
    <div>
      <img src={user.profileImage.url} />
      <h1>{user.name}</h1>
      <h2>{user.username}</h2>
      <h2>{user.address}</h2>
      <h2>{user.description}</h2>
      {user.posts.map(() => {
        return(
          <div>
            
          </div>
        )
      })}
    </div>
  );
  }else{
    return(
      <div>

      </div>
    )
  }
}
