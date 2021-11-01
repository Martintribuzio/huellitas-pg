import axios from 'axios';

const logoutService = async () => {
  try {
    const response: any = await axios.get('http://localhost:3001/user/logout', {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    if (response.data.success === true) {
      window.localStorage.setItem('name', '');
      window.localStorage.setItem('lastname', '');
      window.localStorage.setItem('email', '');
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('userId', '');
    }
  } catch (error) {
    console.log(error);
  }
};

export default logoutService;
