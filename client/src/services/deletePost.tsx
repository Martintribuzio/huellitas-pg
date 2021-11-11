import axios from 'axios';
//import { deletePost } from '../redux/actions';

export default async function deletePostService(_id: string | undefined) {
  try {
    const post = await axios.delete(`/post`, { data: { _id } });
    console.log(post);
    return 'succes';
  } catch (error) {
    console.log(error);
    return error;
  }
}
