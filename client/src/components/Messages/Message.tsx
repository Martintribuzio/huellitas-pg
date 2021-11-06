import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import axios from "axios"
import style from './Message.module.css'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'
import { CollectionsOutlined } from "@mui/icons-material";
import {io} from "socket.io-client"


interface message{
  content: string;
  Converseid: string;
  sender: string;
}

export default function Message(convers:any){
  const [messages,setMessages] = useState<message[]>()
  const [newMessage,setnewMessage] = useState<string>()
  const [arrivalMessage,setArrivalMessage] = useState<any>();
  const socket:any = useRef()
  const idSender = localStorage.getItem('userId');
  const { ConverseId } = useParams<{ConverseId?:string}>()

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
    socket.current = io("ws://localhost:3002")
    socket.current.on("getMessage", (data:message) => {
      setArrivalMessage({
        sender: data.sender,
        content: data.content
      })
    })
  },[])
  
  useEffect(() => {
    if(messages !== undefined){
      arrivalMessage && convers?.menbers.includes(arrivalMessage.sender) && setMessages([...messages, arrivalMessage])
    }
  },[arrivalMessage,convers])

  useEffect(() => {
    socket.current.emit("addUser",idSender)
    socket.current.on("getUsers", (users:[]) => {
      console.log(users)
    })
  },[localStorage])

  const receiverId = convers.menbers?.find((member:string) => member !== idSender)

  const handleSubmit = async (e:any) => {
    socket.current.emit("sendMessage", {
      senderId: idSender,
      receiverId:receiverId,
      text:newMessage
    })

    try{
      e.preventDefault()
      const message = {
        sender:idSender,
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
  

  return (
      <div >
        <div className={style.mensaje} >
          {/* <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          /> */}
          {messages?.map((c) => (
             <p className={c.sender === idSender? 'own':'other' }>{c.content}</p>
          ))}
        </div>
        <div className={style.inputSubmit}>
          <div className={style.inputChat}>
            <Input 
              placeholder="Escribe un mensaje" 
              onChange={(e) => setnewMessage(e.target.value)}
              value={newMessage}  
            />
          </div>
            <div className={style.boton}>
              <Button onClick={handleSubmit}>enviar</Button>
            </div>
          </div>
      </div>
    );
  }