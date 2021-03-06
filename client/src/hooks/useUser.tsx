import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export interface User {
  name: string;
  lastname: string;
  _id: string;
  posts: [];
  username: string;
}

type UserState = User | { error: string };

const verifyUser = async (token: string) => {
  try {
    const response = await axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { name, lastname, _id, posts, username } = response.data;

    const user: User = { name, lastname, _id, posts, username };

    return user;
  } catch (err: any) {
    return { error: err.message };
  }
};

const useUser = () => {
  const [user, setUser] = useState<UserState>();
  const [result, setResult] = useState<string>();
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    let verify = async () => {
      try {
        if (token) {
          const userData: any = await verifyUser(token);
          if (userData.error) {
            throw new Error(userData.error);
          }

          setUser(userData);
          setResult('Success');
          setLoading(false);
        } else {
          throw new Error('No token');
        }
      } catch (error) {
        setResult('Unauthorized');
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  return [result, loading, user];
};

export default useUser;
