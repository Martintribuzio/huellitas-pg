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
import Messages from '../Messages/Messages';
import Input from '@mui/material/Input'
import {useState, useEffect} from 'react'
import style from './Messenger.module.css'
import axios from 'axios'
import Conversations from '../conversations/Conversations';
import getPostsUser from '../../services/getPostsUser';

export default function BottomAppBar() {
    const [search, setSearch] = useState<string>('');
  
    const id = localStorage.getItem('userId');
  
    const [conversation,setConversation] = useState<Array<string>>(['','']);
    const [message,setMessage] = useState([]);
    const [currentChat, setCurrentChat]=useState(null);
  
  
    interface converseichon{
      members:Array<string>
    }

    interface message{
      content:string
      sender:string
    }
    
    useEffect(() => {
      const getConversations = async() => {
        try{
          const res:converseichon = (await axios.get(`/conversation?ida=${id}`)).data
          setConversation(res.members)
        }catch(err:any){
          console.log(err.message)
        }
      }
      getConversations()
    })
  
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      setSearch(e.target.value);
    }

    return (
        <div>
          <CssBaseline />
          <Input className={style.BarraBusqueda} placeholder="Buscar usuarios" type="text" value={search} onChange={handleChange}/>
          <Paper square sx={{ pb: '50px'}}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
              Mensajes
            </Typography>
            <div className="container">
              
              <div>
                 {conversation?.map((c:any) => (
                  <Conversations conversation={c} currentUser={id}/>
                  ))}   
              </div>
              
              <div>
                  {/* {message.map((m:message) => (
                    <Messages text={m.content} own={m.sender === id} />
                  ))} */}
              </div>

              <div>
                  <input placeholder="Escribe un mensaje" />
              </div>
    
            {/* <List sx={{ mb: 2 }} > /}
              {/ {messages.slice(0,5).map(({ id, primary, secondary, person }) => (
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
                    <ListItemText primary={primary} secondary={secondary.length < 50? secondary:${secondary.slice(0,50)}...}  />
                  </ListItem>
                </React.Fragment>
              ))} /}
    
            {/ </List> /}
            </div>
            <div>
              {currentChat?(
                <div>
                  {/ {message.map((m:object) => (
                    <Messages message={m} own={m.sender===user.id}/>
                  ))} */}
                </div>
              ):<span>Comienza una conversación</span>
            {/* </div> */}
          </Paper>
        </div>
      );
    }