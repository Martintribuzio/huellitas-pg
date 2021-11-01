import axios from 'axios';
import Swal from 'sweetalert2';

export default function createUser(data: any, origen: string) {
  //     e.preventDefault();
  //   alert('el creador');
  //   if (origen === 'google') {
  //     data = {
  //       name: data.profileObj.givenName,
  //       lastname: data.profileObj.familyName,
  //       email: data.profileObj.email,
  //       password: data.profileObj.googleId,
  //     };
  //     console.log(data);
  //   } else if (origen === 'facebook') {
  //   } else {
  //     console.log(data);
  //     axios
  //       .post('http://localhost:3001/user/signup', data)
  //       .then(res => {
  //         Swal.fire({
  //           title: 'Success!',
  //           text: 'Fuiste registrado con exito',
  //           icon: 'success',
  //           confirmButtonText: 'Ingresa',
  //         });
  //         console.log(res);
  //       })
  //       .catch(error => console.log(error.message));
  //   }
}
