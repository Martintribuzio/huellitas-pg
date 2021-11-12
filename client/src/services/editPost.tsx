import axios from 'axios';
//import { deletePost } from '../redux/actions';

export default async function editPost(_id: string | undefined, name: string | undefined, type: string, state: string, genre: string, description: string) {
  try {
    const post = await axios.put(`/post`, { data: { _id,  name, type, state, genre, description} });
    //console.log(post);
    return 'succes';
  } catch (error) {  
    //console.log(error);
    return error;
  }
}