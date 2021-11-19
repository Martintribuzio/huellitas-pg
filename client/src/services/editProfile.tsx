import axios from 'axios'

export default async function editProfile(input: FormData) {
  try {
    const profile = await axios.put(`/user/profile`, input, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    console.log('EDITADO', profile.data)
    window.localStorage.setItem('name', profile.data.name)
    window.localStorage.setItem('lastname', profile.data.lastname ? profile.data.lastname : '')
    window.localStorage.setItem('image', profile.data.profileImage.url)
    window.localStorage.setItem('phone', profile.data.phone)
    window.localStorage.setItem('facebook', profile.data.facebook)
    window.localStorage.setItem('instagram', profile.data.instagram)
    window.localStorage.setItem('website', profile.data.website)
    window.localStorage.setItem('address', profile.data.address)
    window.localStorage.setItem('description', profile.data.description)
    return 'succes'
  } catch (error: any) {
    //console.log(error);
    return error
  }
}

// export default async function editProfile(name: string | undefined, username: string, lastname?: string, address?: string,phone?: string, description?: string, imageFile?: string) {
//   try {

//     const profile = await axios.put(`/user/profile`, {name, username,lastname, imageFile, address, phone, description} );
//     window.localStorage.setItem('name', profile.data.name)
//     // console.log(profile.data)
//     window.localStorage.setItem('lastname', profile.data.lastname ? profile.data.lastname : '')
//     // window.localStorage.setItem('image', profile.image)
//     return 'success';
//   } catch (error: any) {
//     return error.message;
//   }
