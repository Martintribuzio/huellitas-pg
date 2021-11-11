import axios from 'axios';

interface data {
  email: string;
  password: string;
}

const loginShelter = async (data: data) => {
  try {
    const { email, password } = data;
    const response = await axios.post('/shelter/login', {
      username: email,
      password: password,
    });

    window.localStorage.setItem('name', response.data.user.name);
    window.localStorage.setItem('email', response.data.user.username);
    window.localStorage.setItem('token', response.data.user.token);
    window.localStorage.setItem('userId', response.data.user._id);
    window.localStorage.setItem('image', response.data.user.picture);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return { error: error.message };

    // throw new Error(error)
  }
};

export default loginShelter;
