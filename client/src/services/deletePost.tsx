import axios from 'axios';
import { deletePost } from '../redux/actions';

export default function deletePostService(id: number) {
  return async (dispatch: any) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      dispatch(deletePost(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}
