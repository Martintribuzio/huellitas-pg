import { PostType } from "../../redux/types/types"

export default function PostDetail(props:PostType){
  console.log(props)
  return(
      <div>
          <img src = {`http://localhost:3001/${props.petImage}`}/>
          <p>{props.description}</p>
          <p>{props.date}</p>
          <p>{props.genre}</p>
          <p>{props.animal}</p>
          <p>{props.postType}</p>
      </div>
  )
}