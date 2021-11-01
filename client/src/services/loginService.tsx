import axios from 'axios';

interface data {
  email: string;
  password: string;
}

const loginService = async (data: data) => {
  try {
    const { email, password } = data;
    const response = await axios.post('http://localhost:3001/user/login', {
      username: email,
      password: password,
    });

    window.localStorage.setItem('name', response.data.user.name);
    window.localStorage.setItem('lastname', response.data.user.lastname);
    window.localStorage.setItem('email', response.data.user.username);
    window.localStorage.setItem('token', response.data.user.token);
    window.localStorage.setItem('userId', response.data.user._id);

    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
};

export default loginService;