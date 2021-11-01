import axios from 'axios';
import { useHistory } from 'react-router-dom';

// const LogoutService = async () => {
//   const history = useHistory();
//   try {
//     const response: any = await axios.get('http://localhost:3001/user/logout', {
//       headers: {
//         Authorization: `Bearer ${window.localStorage.getItem('token')}`,
//       },
//     });
//     if (response.data.success === true) {
//       window.localStorage.setItem('name', '');
//       window.localStorage.setItem('lastname', '');
//       window.localStorage.setItem('email', '');
//       window.localStorage.setItem('token', '');
//       window.localStorage.setItem('userId', '');
//     }
//     history.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default LogoutService;
