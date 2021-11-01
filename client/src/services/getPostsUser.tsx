import axios from 'axios';

const getPostsUser = async (userId: string) => {
  const response = await axios.get(
    `http://localhost:3001/user/posts?id=${userId}`
  );
  console.log(response.data);
  return response.data;
};

export default getPostsUser;
