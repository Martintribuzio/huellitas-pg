import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Message from '../Messages/Message';
import Input from '@mui/material/Input'
import {useState, useEffect, useRef} from 'react'
import style from './Messenger.module.css'
import Conversations from '../conversations/Conversations';
import { useDispatch, useSelector } from 'react-redux';
import { typeState } from '../../redux/reducers/index';
import { conversation } from '../../redux/types/types';
import useUser from '../../hooks/useUser';
import { getConvers } from '../../redux/actions';
import { useParams } from 'react-router';
import {io} from "socket.io-client"
import axios from "axios"
import styles from '../Messages/Message.module.css'

export default function BottomAppBar() {
    const [search, setSearch] = useState<string>('');
    const [arrivalMessage,setArrivalMessage] = useState<any>();
    const [messages,setMessages] = useState<message[]>()
    const id = localStorage.getItem('userId');
    const [ result] = useUser();
    const { ConverseId } = useParams<{ConverseId?:string}>()
    const dispatch = useDispatch();
    const socket:any = useRef()
    
    const [newMessage,setnewMessage] = useState<string>()

  const convers:any = useSelector((state:typeState) => state.conversations);
  console.log("convers = ", convers)
  // const receiverId = convers.members?.find((member:string) => member !== id)
  const receiverId = convers?.find((member:any) => {
    return member.members?.find((m:string) => m !== id)
  })
  console.log("receiverId = ",receiverId)

  interface message{
    content: string;
    Converseid: string;
    sender: string;
  }

  useEffect(() => {
    const getMessage= async () => {
      try{
          const res = await axios.get(`/message/${ConverseId}`)
          setMessages(res.data)
      }catch(err:any){
          return err.message
      }
    }
    getMessage()
  }, [ConverseId])

  useEffect(() => {
    if (result !== 'Unauthorized') {
      if (id) {
        dispatch(getConvers(id));
      }
    }
  }, [result]);
  
  useEffect(() => {
    if(messages !== undefined){
      arrivalMessage && convers?.members?.includes(arrivalMessage.sender) && setMessages([...messages, arrivalMessage])
    }
  },[arrivalMessage,convers])

   useEffect(() => {
    socket.current.emit("addUser",id)
    socket.current.on("getUsers", (users:[]) => {
      console.log(users)
    })
  },[localStorage])
  
  const handleSubmit = async (e:any) => {
    try{
      e.preventDefault()
      socket.current.emit("sendMessage", {
        senderId: id,
        receiverId:receiverId,
        text:newMessage
      })
      const message = {
        sender:id,
        content: newMessage,
        Converseid: ConverseId
      }
      const res = await axios.post("/message", message)
      if(messages !== undefined){
        setMessages([...messages, res.data])
        setnewMessage('')
      }
    }catch(err:any){
      console.log(err.message)
    }
  }   

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  if(!Array.isArray(convers)){
    return(
      <div>
        <h1>No conversations</h1>
      </div>
    )
  }else{
    return (

      <div className={style.container}>
            <div className={style.conv}>
            
            <List  >
            <Input className={style.BarraBusqueda} placeholder="Buscar usuarios" type="text" value={search} onChange={handleChange}/>
              <Conversations/>
            </List>
            </div>
      <div className={ConverseId?style.fondoChat:style.none}>
        <div className={styles.mensaje} >
          {messages?.map((c) => (
             <p className={c.sender === id? 'own':'other' }>{c.content}</p>
          ))}
        </div>
        <div className={styles.inputSubmit}>
          <div className={styles.inputChat}>
            <Input 
              placeholder="Escribe un mensaje" 
              onChange={(e) => setnewMessage(e.target.value)}
              value={newMessage}  
            />
          </div>
            <div className={styles.boton}>
              <Button onClick={handleSubmit}>enviar</Button>
            </div>
          </div>
          </div>
        </div>
      
      );
    }
  }
