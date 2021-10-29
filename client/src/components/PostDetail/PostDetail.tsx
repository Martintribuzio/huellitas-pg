import { useEffect } from "react";
import { PostType } from "../../redux/types/types"
import { useDispatch, useSelector } from "react-redux";
import { typeState } from '../../redux/reducers/index'
import { getPosts } from "../../redux/actions";
import { RouteProps, useParams } from "react-router";
import { detailProps } from "../../redux/types/types";
import { RouteComponentProps } from "react-router";
type TParams = {_id : string}
export default function PostDetail({ match }: RouteComponentProps<TParams>){

  const dispatch = useDispatch();
  let allPosts = useSelector((state: typeState) => (state.filteredPosts))
   
  
  // const params = useParams<RouteProps>();
  
  useEffect(()=>{
    dispatch(getPosts());
  }, [dispatch]);

  let detailpost = allPosts.find(elem => elem._id === match.params._id)
  // let detailpost = allPosts.find(elem => elem.genre === 'gato')
  if(detailpost !== undefined){
  return(
      <div>
          <img src = {`http://localhost:3001/${detailpost.petImage}`}/>
          <p>{detailpost.description}</p>
          <p>{detailpost.date}</p>
          <p>{detailpost.genre}</p>
          <p>{detailpost.type}</p>
          <p>{detailpost.state}</p>
      </div>
  )}
}