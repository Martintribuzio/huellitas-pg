import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getPostsUser = async (userId: string) => {
  const response = await axios.get(`/user/posts?id=${userId}`);
  return response.data;
};

export default getPostsUser;
