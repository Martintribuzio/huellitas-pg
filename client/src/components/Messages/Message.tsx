import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import style from './Message.module.css'
import Button from '@mui/material/Button';
import Input from '@mui/material/Input'

interface message{
  content: string;
  Converseid: string;
  sender: string;
}

export default function Message(){
  const [messages,setMessages] = useState<message[]>()
  const [newMessage,setnewMessage] = useState<string>()
  
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
  
  const handleSubmit = async (e:any) => {
    try{
      e.preventDefault()
      const message = {
        sender:idSender,
        content: newMessage,
        conversationId: ConverseId
      }
      const res = await axios.post("/message", message)
      console.log(res.data)
      if(messages !== undefined){
        setMessages([...messages, res.data])
      }
    }catch(err:any){
      console.log(err.message)
    }
  }   

  return (
      <>
      <div /* className={params.own ? "message own" : "message"} */ >
        <div className={style.mensaje}>
          {/* <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          /> */}
          {messages?.map((c) => (
             <p>{c.content}</p>
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
      </>
    );
  }