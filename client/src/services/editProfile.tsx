import axios from 'axios';

export default async function editProfile(name: string | undefined, lastname: string, username: string, address: string,phone: string, description: string) {
  try {
    console.log("mi nombre yo ",name)
    const profile = await axios.put(`/user/profile`, {name, lastname, username, address, phone, description} );
    window.localStorage.setItem('name', profile.data.name)
    window.localStorage.setItem('lastname', profile.data.lastname)
    // window.localStorage.setItem('image', profile.image)
    return 'success';
  } catch (error: any) {  
    return error.message;
  }
}