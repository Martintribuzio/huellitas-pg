import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar'
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
import { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import mochi from '../../assets/mochi.gif'
import phone from '../../assets/phone.gif'

dotenv.config()

const fadeLeft: Variants = {
  initial: {
    x: '100%',
    opacity: 1,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}
interface User {
  name: string
  lastname: string
  _id: string
  posts: []
  username: string
  picture?: string
  profileImage?: any
}
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
  const [user, setUser] = useState<User | null>()
  const dispatch = useDispatch()
  const socket: any = useRef()
  const idSender = localStorage.getItem('userId')
  const userImage = localStorage.getItem('image')
  const scrollRef = useRef<any>()
  const ConverseId = props.path
  const convers: any = useSelector((state: typeState) =>
    Array.isArray(state.conversations)
      ? state.conversations.find((convers: any) => convers._id === ConverseId)
      : []
  )
  console.log('USER', user)
  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`)
    socket.current.on('getMessage', (data: any) => {
      console.log(data.senderId, idSender)
      if (data.senderId !== idSender) {
        setArrivalMessage({
          sender: data.senderId,
          content: data.text,
        })
      }
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
    scrollRef.current?.scrollIntoView(false, { behavior: 'auto' })
  }, [messages])

  useEffect(() => {
    setUser(null)

    const friendId =
      convers && convers.members
        ? convers.members.find((id: string) => id !== idSender)
        : null
    console.log('ID', friendId)
    const getUser = async (friendId: string) => {
      try {
        const res = await axios.get(`/user?id=${friendId}`)
        setUser(res.data)
      } catch (err: any) {
        return err.message
      }
    }
    getUser(friendId)
  }, [idSender, ConverseId])

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
  var days = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab']

  if (convers) {
    return (
      <motion.div className={style.Chat}>
        <>
          <div className={style.Chat__header}>
            <Link to={`/home/messenger`}>
              <img src={back} alt='' />
            </Link>
          </div>
          <div className={style.mensaje}>
            {messages?.length ? (
              messages?.map((c: message, index: number) => {
                if (c.state === 'unread' && c.sender !== idSender) {
                  axios.put(`/message/${c._id}`)
                }
                return (
                  <>
                    <div
                      key={index}
                      className={
                        c.sender !== idSender ? style.other : style.own
                      }>
                      <div className={style.messageData}>
                        {c.sender !== idSender && (
                          <Avatar
                            style={{ marginLeft: '5px' }}
                            alt='Profile Picture'
                            src={
                              user
                                ? user.picture
                                  ? user.picture
                                  : user.profileImage
                                  ? user.profileImage.url
                                  : ''
                                : ''
                            }
                          />
                        )}
                        <small className={style.date}>
                          {days[new Date().getDay()] +
                            ' ' +
                            new Date(c.createdAt)
                              .toTimeString()
                              .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
                              .slice(0, 5)}
                        </small>
                        {c.sender === idSender && (
                          <Avatar
                            style={{ marginLeft: '5px', marginRight: '5px' }}
                            alt='Profile Picture'
                            src={userImage ? userImage : ''}
                          />
                        )}
                      </div>

                      <p className={style.messageContent}>{c.content}</p>
                    </div>
                    {index === messages.length - 1 && (
                      <div ref={scrollRef}></div>
                    )}
                  </>
                )
              })
            ) : (
              <div className={style.empty}>
                <img src={phone} alt='mochi' />
                <h2>Envia el primer mensaje!</h2>
              </div>
            )}
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
      </motion.div>
    )
  } else {
    return (
      <div className={style.empty}>
        <img src={mochi} alt='mochi' />
        <h2>Selecciona un chat para mostrar los mensajes</h2>
      </div>
    )
  }
}
