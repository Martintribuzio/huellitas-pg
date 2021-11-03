import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getPostsUser = async (userId: string) => {
  const response = await axios.get(`/user/posts?id=${userId}`);
  console.log(response.data);
  return response.data;
};

export default getPostsUser;
