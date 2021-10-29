import { PostType } from "../redux/types/types"

export default function Post(props: PostType){
    return(
        <div>
            {typeof props.petImage === "string" && props.petImage?<img src = {`http://localhost:3001/${props.petImage}`}></img> : ""}
            <p>{props.description}</p>
            <p>{props.date}</p>
            <p>{props.genre}</p>
            <p>{props.animal}</p>
            <p>{props.postType}</p>
        </div>
    )
} 