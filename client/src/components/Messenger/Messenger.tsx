import { useResizeDetector } from 'react-resize-detector'
import Conversations from '../conversations/Conversations'
import { useLocation } from 'react-router-dom'
import Message from '../Messages/Message'
import style from '../Messages/Message.module.css'
import { useState } from 'react'

export const Messenger = () => {
  const [conver, setConver] = useState(null)
  const path = useLocation().pathname.split('/')[3]

  return (
    <div className={style.messengerContainer}>
      <Conversations />
      <Message path={path} />
    </div>
  )
}
