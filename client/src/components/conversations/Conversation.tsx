import axios from 'axios'
import { useState, useEffect } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import { Link, useParams } from 'react-router-dom'
import { SpinnerRoundFilled } from 'spinners-react'
interface User {
  name: string
  lastname: string
  _id: string
  posts: []
  username: string
  picture?: string
  profileImage?: any
}
interface message {
  content: string
  Converseid: string
  sender: string
  state: string
}
export default function Conversation(params: any) {
  const [user, setUser] = useState<User>()
  const [notification, setNotification] = useState<number>(0)
  const myId = localStorage.getItem('userId')
  const { ConversId } = useParams<any>()

  useEffect(() => {
    const friendId = params.conversation.members.find(
      (elem: string) => elem !== myId
    )
    const getUser = async (friendId: string) => {
      try {
        const res = await axios.get(`/user?id=${friendId}`)
        setUser(res.data)
      } catch (err: any) {
        return err.message
      }
    }

    const noti = params.conversation.messages.reduce(
      (acc: number, m: message) =>
        m.state === 'unread' && m.sender !== myId ? acc + 1 : acc,
      0
    )
    setNotification(noti)
    getUser(friendId)
    // getMessage();
  }, [params, myId])

  const bgColor =
    params.conversation._id === ConversId ? '#73A7CB' : 'transparent'
  const fontColor = params.conversation._id === ConversId ? '#fff' : '#000'

  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={`/home/messenger/${params.conversation._id}`}>
      {/* {id === 1 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Hoy
          </ListSubheader>
        )}
        {id === 3 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Este mes
          </ListSubheader>
        )} */}
      <ListItem
        style={{
          width: '97%',
          border: '1px solid rgba(128, 128, 128, 0.2)',
          height: '73px',
          borderRadius: '5px',
          margin: '10px 5px',
          backgroundColor: bgColor,
          color: fontColor,
        }}
        button>
        {user ? (
          <>
            <ListItemAvatar>
              <Badge badgeContent={notification} color='error'>
                <Avatar
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
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                params.conversation?.messages[
                  params.conversation.messages.length - 1
                ]?.content?.length > 15
                  ? params.conversation?.messages[
                      params.conversation.messages.length - 1
                    ]?.content.slice(0, 15) + '...'
                  : params.conversation?.messages[
                      params.conversation.messages.length - 1
                    ]?.content
              }
            />
          </>
        ) : (
          <SpinnerRoundFilled
            color='#ffff'
            style={{ alignSelf: 'center', justifySelf: 'center' }}
          />
        )}
      </ListItem>
    </Link>
  )
}
