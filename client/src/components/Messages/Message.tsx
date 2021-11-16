import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import style from './Message.module.css'
import Input from '@mui/material/Input'
import { io } from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send'
import { typeState } from '../../redux/reducers/index'
import dotenv from 'dotenv'
import { Link, useLocation } from 'react-router-dom'
import back from '../../assets/back.png'
import { getConvers } from '../../redux/actions/index'
import { useParams } from 'react-router-dom'
dotenv.config()

export interface message {
  content: string
  Converseid: string
  sender: string
  state: string
  _id: string
  createdAt: string
  updatedAt: string
}

export default function Message(props: any) {
  const [messages, setMessages] = useState<message[]>()
  const [newMessage, setnewMessage] = useState<string>('')
  const [arrivalMessage, setArrivalMessage] = useState<any>()
  const dispatch = useDispatch()
  const socket: any = useRef()
  const idSender = localStorage.getItem('userId')
  const scrollRef = useRef<any>()
  const ConverseId = props.path

  const convers: any = useSelector((state: typeState) =>
    Array.isArray(state.conversations)
      ? state.conversations.find((convers: any) => convers._id === ConverseId)
      : []
  )

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
  }, [arrivalMessage]) // NO AGREGAR MESSAGES COMO DEPENDENCIA

  useEffect(() => {
    setMessages(convers?.messages)
  }, [ConverseId, convers])

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
        if (idSender) {
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

  return (
    <div className={style.Chat}>
      {convers ? (
        <>
          <div className={style.Chat__header}>
            <Link to={`/home/messenger`}>
              <img src={back} alt='' />
            </Link>
          </div>
          <div className={style.mensaje}>
            {messages?.map((c: message, index: number) => {
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
          </div>{' '}
        </>
      ) : (
        <h1>No hay conversaciones seleccionadas</h1>
      )}
    </div>
  )
}
