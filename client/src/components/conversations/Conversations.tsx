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
        <div>
            <img src={user?.image}/>
            <span>{user?.name}</span>
        </div>
    )
}