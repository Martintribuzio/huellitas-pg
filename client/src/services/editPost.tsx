import axios from 'axios';
import { PostType } from '../redux/types/types';
//import { deletePost } from '../redux/actions';

export default async function editPost(input: FormData) {
  try {
    const post = await axios.put(`/post`, input, {headers: { 'Content-Type': 'multipart/form-data' }} );
    //console.log(post);
    return 'succes';
  } catch (error) {  
    //console.log(error);
    return error;
  }
}