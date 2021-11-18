import Conversation from './Conversation'
import { useDispatch, useSelector } from 'react-redux'
import { conversation } from '../../redux/types/types'
import { typeState } from '../../redux/reducers/index'
import useUser from '../../hooks/useUser'
import { useEffect } from 'react'
import { getConvers } from '../../redux/actions'
import style from '../Messages/Message.module.css'
import { SpinnerCircular } from 'spinners-react'
import { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { Http2ServerRequest } from 'http2'

const fadeRigth: Variants = {
  initial: {
    x: '-100%',
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
  exit: {
    x: '100%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

export default function Conversations(props: any) {
  const convers: Array<conversation> = useSelector(
    (state: typeState) => state.conversations
  )
  const id = localStorage.getItem('userId')
  const dispatch = useDispatch()
  const [result, loading] = useUser()

  const visibility = true

  useEffect(() => {
    if (result !== 'Unauthorized') {
      if (id) {
        dispatch(getConvers(id))
      }
    }
  }, [dispatch, id, result])

  if (loading) {
    return (
      <motion.div
        variants={props.mobile ? fadeRigth : undefined}
        initial='initial'
        animate='animate'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className={style.conv}>
        <SpinnerCircular color='#ffff' />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={fadeRigth}
      initial='initial'
      animate='animate'
      className={style.conv}>
      {props.title ? (
        <h2 style={{ color: 'gray', textAlign: 'center' }}>Mensajes</h2>
      ) : null}
      {convers.length && Array.isArray(convers) && result !== 'Unauthorized'
        ? convers.map((c: any, index: number) => (
            <Conversation key={index} conversation={c} />
          ))
        : null}
    </motion.div>
  )
}
