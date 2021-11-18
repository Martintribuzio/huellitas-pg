import { useResizeDetector } from 'react-resize-detector'
import Conversations from '../conversations/Conversations'
import { Redirect, useLocation } from 'react-router-dom'
import Message from '../Messages/Message'
import style from '../Messages/Message.module.css'
import { useState } from 'react'
import useUser from '../../hooks/useUser'

export const Messenger = () => {
  const path = useLocation().pathname.split('/')[3]
  const { width, ref } = useResizeDetector()
  const mobile = width && width < 900

  const [result, loading] = useUser()

  if (!loading && result === 'Success') {
    if (!mobile)
      return (
        <div ref={ref} className={style.messengerContainer}>
          <Conversations mobile={mobile} title='Mensajes' />
          <Message path={path} mobile={mobile} />
        </div>
      )
    else
      return (
        <div ref={ref} className={style.messengerContainer}>
          {path ? (
            <Message path={path} mobile={mobile} />
          ) : (
            <Conversations mobile={mobile} title='Mensajes' />
          )}
        </div>
      )
  } else if (loading) {
    return <div ref={ref}></div>
  } else {
    return <Redirect to='/login' />
  }
}
