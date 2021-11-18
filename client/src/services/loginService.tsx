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
    console.log('asdsadsadsadsadsadsadd', response.data)
    window.localStorage.setItem('name', response.data.user.name)
    window.localStorage.setItem('lastname', response.data.user.lastname)
    window.localStorage.setItem('email', response.data.user.username)
    window.localStorage.setItem('token', response.data.user.token)
    window.localStorage.setItem('userId', response.data.user._id)
    window.localStorage.setItem('image', response.data.user.profileImage.url)

    return response.data
  } catch (error: any) {
    return { error: error.message }

    // throw new Error(error)
  }
}

export default loginService
