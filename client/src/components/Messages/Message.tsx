import { useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import style from './Message.module.css'

interface message{
  content: string;
  Converseid: string;
  sender: string;
}



export default function Message(){
  const [message,setMessage] = useState<message[]>()
  // const {Converseid} = useParams()
  // useEffect(() => {
  //   const getMessage= async () => {
  //     try{
  //         // console.log('ID CONVERSACION',Converseid)
  //         // const res = await axios.get(`/message/${Converseid}`)
  //         console.log(res.data)
  //         setMessage(res.data)
  //     }catch(err:any){
  //         return err.message
  //     }
  //   }
  //   getMessage()
  // }, [Converseid])
  
     
  return (
      <>
      <div /* className={params.own ? "message own" : "message"} */ >
        <div className={style.mensaje}>
          {/* <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          /> */}
          {message?.map((c) => (
             <p>{c.content}</p>
          ))}
          hola??
        </div>
      </div>
      </>
    );
  }