import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { getConvMembers } from '../../redux/actions';
import { typeState } from '../../redux/reducers';

export interface User {
  name: string;
  lastname: string;
  _id: string;
  posts: [];
  username: string;
  picture?: string;
}
interface message {
  content: string;
  Converseid: string;
  sender: string;
  state:string;
}
export default function Conversation(params: any) {
  const user=useSelector((state:typeState)=>state.convMembers)
  // const [user, setUser] = useState<User>();
  // const[contact,setContact]=useState<User>();
  const [message, setMessage] = useState<message[]>();
  const [notification, setNotification] = useState<number>(0);
  const myId = localStorage.getItem('userId');
  const dispatch=useDispatch();
console.log(user)
useEffect(()=>{
  const friendId = params.conversation.members.find(
    (elem: string) => elem !== myId
  );
  dispatch(getConvMembers(friendId));
},[dispatch])
  useEffect(() => {
    // const friendId = params.conversation.members.find(
    //   (elem: string) => elem !== myId
    // );
    // const getUser = async (friendId: string) => {
      // dispatch(getConvMembers(friendId));

      // try {
      //   const res = await axios.get(`/user?id=${friendId}`);
      //   setUser(res.data);
      //   setContact(res.data);
        
  
      // } catch (err: any) {
      //   return err.message;
      // }
    // };
    
    const getMessage = async () => {
      try {
        const res = (await axios.get(`/message/${params.conversation._id}`)).data;
        const noti = res.reduce((acc:number,m:message) => m.state==='unread' && m.sender!==myId ? acc+1:acc,0);
        setNotification(noti);
        setMessage(res);
      } catch (err: any) {
        return err.message;
      }
    };
    // getUser(friendId);
    getMessage();
  }, [params, myId]);

  if (user && message) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/home/messenger/${params.conversation._id}`}>
        {/* {id === 1 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Hoy
          </ListSubheader>
        )}
        {id === 3 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Este mes
          </ListSubheader>
        )} */}
     
        <ListItem button>
          <ListItemAvatar>
            <Badge badgeContent={notification} color='error'>
            <Avatar alt='Profile Picture' src={user[0].picture} />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={user[0].name}
            secondary={message[message.length - 1]?.content.length > 15
              ? message[message.length - 1]?.content.slice(0, 15) + '...'
              : message[message.length - 1]?.content}
          />
        </ListItem>
      </Link>
    );
  } else {
    return <div>Cargando..</div>;
  }
}
