import axios from 'axios'

interface data {
  email: string
  password: string
}

const loginService = async (data: data) => {
  try {
    const { email, password } = data
    const response = await axios.post('/user/login', {
      username: email,
      password: password,
    })
    // console.log('asdsadsadsadsadsadsadd', response.data)
    window.localStorage.setItem('name', response.data.user.name)
    window.localStorage.setItem('lastname', response.data.user.lastname)
    window.localStorage.setItem('email', response.data.user.username)
    window.localStorage.setItem('token', response.data.user.token)
    window.localStorage.setItem('userId', response.data.user._id)
    window.localStorage.setItem('phone', response.data.user.phone)
    window.localStorage.setItem('facebook', response.data.user.facebook)
    window.localStorage.setItem('instagram', response.data.user.instagram)
    window.localStorage.setItem('website', response.data.user.website)
    window.localStorage.setItem('address', response.data.user.address)
    window.localStorage.setItem('description', response.data.user.description)
    window.localStorage.setItem('image', response.data.user.picture !== ""? response.data.user.picture:response.data.user.profileImage)

    return response.data
  } catch (error: any) {
    return { error: error.message }

    // throw new Error(error)
  }
}

export default loginService
