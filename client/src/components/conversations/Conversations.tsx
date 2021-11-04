import axios from 'axios'
import {useState, useEffect} from 'react'


export default function Conversations(conversation:any, currentUser:string){
    const [user,setUser] = useState(Object);
    

    useEffect(() => {
        const friendId = conversation.members?.find((elem:string) => elem !== currentUser)

        const getUser = async () => {
            try{
              const res = await axios.get('/user'+ friendId)
              setUser(res.data)
            }catch(err:any){
              return err.message
            }
            getUser()
        }

    },[currentUser, conversation])
  
    
    return(
        <React.Fragment key={id}>
            {id === 1 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Hoy
          </ListSubheader>
        )}
        {id === 3 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
            Este mes
          </ListSubheader>
        )}
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={person} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary.length < 50? secondary:${secondary.slice(0,50)}...}  />
        </ListItem>
      </React.Fragment>
    )
}