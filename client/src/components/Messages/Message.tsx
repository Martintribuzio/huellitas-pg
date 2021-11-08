import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import style from './Message.module.css';
import Input from '@mui/material/Input';
import { io } from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import { typeState } from '../../redux/reducers/index';
import dotenv from 'dotenv';
dotenv.config();

interface message {
  content: string;
  Converseid: string;
  sender: string;
}

export default function Message() {
  const [messages, setMessages] = useState<message[]>();
  const [newMessage, setnewMessage] = useState<string>('');
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const socket: any = useRef();
  const idSender = localStorage.getItem('userId');
  const { ConverseId } = useParams<{ ConverseId: string }>();
  const scrollRef = useRef<any>();

  const conversState: any = useSelector(
    (state: typeState) => state.conversations
  );
  console.log(conversState);
  const convers = Array.isArray(conversState)
    ? conversState.filter((elem: any) => elem._id === ConverseId)[0]
    : [];

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`/message/${ConverseId}`);
        setMessages(res.data);
      } catch (err: any) {
        return err.message;
      }
    };
    getMessage();
  }, [ConverseId]);

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`);
    socket.current.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.text,
      });
    });
  }, []);

  useEffect(() => {
    if (messages !== undefined) {
      arrivalMessage &&
        convers?.members.includes(arrivalMessage.sender) &&
        setMessages((prev: any) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, convers]);

  useEffect(() => {
    socket.current.emit('addUser', idSender);
  }, [idSender]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false,{ behavior: "smooth" });
  }, [messages]);

  const receiverId = convers?.members?.find(
    (member: string) => member !== idSender
  );

  const handleSubmit = async (e: any) => {
    if(newMessage){
    try {
      e.preventDefault();
      socket.current.emit('sendMessage', {
        senderId: idSender,
        receiverId: receiverId,
        text: newMessage,
      });
      const message = {
        sender: idSender,
        content: newMessage,
        Converseid: ConverseId,
      };
      const res = await axios.post('/message', message);
      if (messages !== undefined) {
        setMessages([...messages, res.data]);
        setnewMessage('');
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }
  };

  return (
    <div>
      <div className={style.fondoChat}>
        <div className={style.mensaje}>
          <img
            className='messageImg'
            // src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=''
          />
          {messages?.map(c => (
            <div ref={scrollRef} className={c.sender !== idSender ? style.other : style.own}>
              <p>{c.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={style.inputSubmit}>
        <div className={style.inputChat}>
          <Input
            sx={{width: '100%'}}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            placeholder='Escribe un mensaje'
            onChange={e => setnewMessage(e.target.value)}
            value={newMessage}
          />
        </div>
        <div onClick={handleSubmit} className={style.boton}>
          <SendIcon></SendIcon>
        </div>
      </div>
    </div>
  );
}
