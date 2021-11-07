import axios from 'axios'
import {useState, useEffect} from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

interface User{
    name: string;
  lastname: string;
  _id: string;
  posts: [];
  username: string;
  picture?: string;
}
interface message{
    content: string;
    Converseid: string;
    sender: string;
}
export default function Conversations(params:any){
    const [user,setUser] = useState<User>();
    const [message,setMessage] = useState<message[]>();
    

    useEffect(() => {
        const friendId = params.conversation.members?.find((elem:string) => elem !== params.own)
        const getUser = async (friendId:string) => {
            try{
              const res = await axios.get(`/user/${friendId}`)
              setUser(res.data)
            }catch(err:any){
              return err.message
            }
        }
        const getMessage= async () => {
            try{
                const res = await axios.get(`/message/${params.conversation._id}`)
                setMessage(res.data)
            }catch(err:any){
                return err.message
            }
        }
        getUser(friendId)
        getMessage()

    },[params])
  
    if(user && message){
    return(
        <Link  style={{textDecoration:'none'}} to={`/home/messenger/${params.conversation._id}`}>
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
            <Avatar alt="Profile Picture" src={user.picture} />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={message[message.length - 1]?.content}  />
        </ListItem>
      </Link>
    )}
    else{
        return(
            <div>
                No hay conversaciones
            </div>
        )
    }
}