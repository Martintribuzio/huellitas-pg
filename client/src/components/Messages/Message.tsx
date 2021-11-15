import { useEffect, useMemo, useRef, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios'
import style from './Message.module.css'
import Input from '@mui/material/Input'
import { io } from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send'
import { typeState } from '../../redux/reducers/index'
import dotenv from 'dotenv'
import Conversations from '../conversations/Conversations'
import { Link } from 'react-router-dom'
import { useResizeDetector } from 'react-resize-detector'
import back from '../../assets/back.png'
import {getConvers} from '../../redux/actions/index'
dotenv.config()

export interface message {
  content: string
  Converseid: string
  sender: string
  state: string
  _id: string
  createdAt: string
}

export default function Message(props: any) {
  const [messages, setMessages] = useState<message[]>()
  const [newMessage, setnewMessage] = useState<string>('')
  const [arrivalMessage, setArrivalMessage] = useState<any>()
  // const [convers,setConver] = useState<any>()
  const dispatch = useDispatch()
  const socket: any = useRef()
  const idSender = localStorage.getItem('userId')
  // const { ConverseId } = useParams<{ ConverseId: string }>();
  const scrollRef = useRef<any>()
  const ConverseId = props.match ? props.match.params.ConversId : ''
  const convers: any = useSelector(
    (state: typeState) => state.conversations.find((convers: any) => convers._id === ConverseId)
  )

  // useEffect(() => {
  //   setConver(Array.isArray(conversState)
  //       ? conversState.filter((elem: any) => elem._id === ConverseId)[0]
  //       : [])
  // },[])


  // useEffect(() => {
  //   const getMessage = async () => {
  //     try {
  //       const res = await axios.get(`/message/${ConverseId}`)
  //       setMessages(res.data)
  //     } catch (err: any) {
  //       return err.message
  //     }
  //   }
  //   getMessage()
  // }, [ConverseId])

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`)
    socket.current.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        content: data.text,
      })
    })
  }, [])
 
  useEffect(() => {
    if (messages !== undefined) {
      arrivalMessage &&
        convers?.members.includes(arrivalMessage.sender) &&
        setMessages((prev: any) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage, convers]) // NO AGREGAR MESSAGES COMO DEPENDENCIA

  useEffect(() => {
    setMessages(convers.messages)
  }, [ConverseId])

  useEffect(() => {
    socket.current.emit('addUser', idSender)
  }, [idSender])

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false, { behavior: 'smooth' })
  }, [convers, idSender])

  const receiverId = convers?.members?.find(
    (member: string) => member !== idSender
  )

  const handleSubmit = async (e: any) => {
    if (newMessage) {
      try {
        e.preventDefault()
        socket.current.emit('sendMessage', {
          senderId: idSender,
          receiverId: receiverId,
          text: newMessage,
        })
        const message = {
          sender: idSender,
          content: newMessage,
          Converseid: ConverseId,
        }
        const res = await axios.post('/message', message)
        setMessages((prev: any) => [...prev, res.data])
        setnewMessage('')
        if(idSender){
          dispatch(getConvers(idSender))
        }
        await axios.get('/message/mailNotification', {
          params: { receiverId: receiverId },
        })
      } catch (err: any) {
        console.log(err.message)
      }
    }
  }

  if (convers?.members?.includes(idSender)) {
    console.log(messages)
    return (
      <div className={style.Chat}>
        <div className={style.Chat__header}>
          <Link to={`/home/messenger`}>
            <img src={back} alt='' />
          </Link>
        </div>
        <div className={style.mensaje}>
          {messages?.map((c:message, index:number) => {
            if (c.state === 'unread' && c.sender !== idSender) {
              axios.put(`/message/${c._id}`)
            }
            return (
              <div
                key={index}
                ref={scrollRef}
                className={c.sender !== idSender ? style.other : style.own}>
                <p>{c.content}</p>
              </div>
            )
          })}
        </div>
        <div className={style.inputChat}>
          <Input
            sx={{ width: '100%', height: '100%', borderBottom: 'none' }}
            className={style.inputMU}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSubmit(e)
              }
            }}
            placeholder='Escribe un mensaje'
            onChange={e => setnewMessage(e.target.value)}
            value={newMessage}
          />
          <button onClick={handleSubmit} className={style.boton}>
            <SendIcon></SendIcon>
          </button>
        </div>
      </div>
    )
  } else {
    return <Redirect to='/home' />
  }
}

export const Messenger = ({ match }: any) => {
  const { width, ref } = useResizeDetector()
  const params = useParams()
  const mobile = width && width < 900

  if (!mobile) {
    return (
      <div ref={ref} className={style.messengerContainer}>
        <Conversations />
        <Message match={match} />
      </div>
    )
  } else {
    return Object.keys(params).length && mobile ? (
      <div ref={ref} className={style.messengerContainer}>
        <Message match={match} />
      </div>
    ) : (
      <div ref={ref} className={style.messengerContainer}>
        <Conversations />
      </div>
    )
  }
}
