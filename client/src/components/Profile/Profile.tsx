import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useHistory, Redirect } from 'react-router-dom'
import getPostsUser from '../../services/getPostsUser'
import Post from '../Post'
import { PostType } from '../../redux/types/types'
import useUser from '../../hooks/useUser'
import profile from '../../assets/profile.png'
import deletePostService from '../../services/deletePost'
import Button from '@mui/material/Button'
import { Modal } from '../Modal'
import { useModal } from '../../hooks/useModal'
import EditProfile from '../editProfile/EditProfile'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { typeState } from '../../redux/reducers'
import Swal from 'sweetalert2'

export interface User {
  name: string
  lastname: string
  username: string
  image: string
  instagram: string
  facebook: string
  website: string
  address: string
  phone: string
  description: string
}

export interface Shelter {
  name: string
  lastname: string
  username: string
  image: string
  address: string
  phone: string
  description: string
  type: string
}

export default function Profile() {
  const history = useHistory()
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<PostType[]>([])
  const [ownUser, setownUser] = useState<Shelter>()
  let [isModal, setIsModal] = useState(false)

  const toggleModal = function () {
    // console.log('antes ', isModal)
    setIsModal((isModal = !isModal))
    // console.log('despues ', isModal)
  }

  const [result] = useUser()

  if (result === 'Unauthorized') {
    history.push('/login')
  }

  const id = localStorage.getItem('userId')

  useEffect(() => {
    const getUsuario = async () => {
      let usuario = await axios.get(`/user?id=${id}`)
      setownUser(usuario.data)
      // console.log("mono hombre ",usuario.data)
    }
    getUsuario()
  }, [])

  const handleClick = (id: string | undefined) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    })

    swalWithBootstrapButtons
      .fire({
        title: '¿Seguro que quieres eliminar la publicación?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero eliminarla!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: false,
      })
      .then(result => {
        if (result.isConfirmed) {
          deletePostService(id)
          setPosts(posts.filter(post => post._id !== id))
          swalWithBootstrapButtons.fire(
            'Eliminada!',
            'Tu publicación ha sido eliminada',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu publicación NO se ha eliminado',
            'error'
          )
        }
      })
  }

  // let refresh = useSelector((state: typeState) => state.editPost);
  // console.log("soy yo ",ownUser)
  useEffect(() => {
    if (id) {
      getPostsUser(id).then(post => {
        setPosts(post)
      })
      let name = localStorage.getItem('name')
      let lastname = localStorage.getItem('lastname')
      let username = localStorage.getItem('email')
      let image = localStorage.getItem('image')
      let instagram = localStorage.getItem('instagram')
      let facebook = localStorage.getItem('facebook')
      let website = localStorage.getItem('website')
      let address = localStorage.getItem('address')
      let phone = localStorage.getItem('phone')
      let description = localStorage.getItem('description')
      // console.log("IMAGENNNN", image)
      // let type = localStorage.getItem('type')

      const user = {
        name: name ? name : '',
        lastname: lastname ? (lastname !== 'undefined' ? lastname : '') : '',
        username: username ? username : '',
        image: image ? image : profile,
        instagram: instagram ? instagram : '',
        facebook: facebook ? facebook : '',
        website: website ? website : '',
        address: address ? address : '',
        phone: phone ? phone : '',
        description: description ? description : '',

        // type: type ? 'user' : '',
      }
      setUser(user)
      // console.log("despues ",isModal)
      // console.log(user?.image.includes("googleusercontent"))
    }
  }, [id, isModal])

  // console.log('USER',user)
  if (ownUser?.type === 'shelter') {
    return result === 'Unauthorized' ? (
      <Redirect to='/login' />
    ) : (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0 ',
          minHeight: '71vh',
        }}>
        <Button onClick={toggleModal}> Editar Perfil </Button>
        <Modal isOpen={isModal} closeModal={toggleModal}>
          {ownUser !== undefined ? (
            <EditProfile modal={toggleModal} ownUser={ownUser} />
          ) : null}
        </Modal>
        {user ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ width: '96px', height: '96px' }} src={user.image} />
            <Typography variant='h4'>{user.name}</Typography>
            <Typography variant='h6'>{user.username}</Typography>
            <Typography variant='h6'>{user.phone}</Typography>
            <Typography variant='h6'>{user.address}</Typography>
            <Typography variant='h6'>{user.description}</Typography>
            <Typography variant='h6'>{user.website}</Typography>
            <Typography variant='h6'>{user.instagram}</Typography>
            <Typography variant='h6'>{user.facebook}</Typography>
            <Typography>Mis posts!</Typography>
            {Array.isArray(posts) ? (
              posts.map(post => {
                return (
                  <div>
                    <Post post={post}></Post>
                    <Button
                      variant='contained'
                      onClick={() => handleClick(post._id)}>
                      {' '}
                      Eliminar
                    </Button>
                  </div>
                )
              })
            ) : (
              <Typography>No hay publicaciones</Typography>
            )}
          </Box>
        ) : (
          ''
        )}
      </Box>
    )
  } else {
    return result === 'Unauthorized' ? (
      <Redirect to='/login' />
    ) : (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 0 ',
          minHeight: '71vh',
        }}>
        {user?.image.includes('googleusercontent') ? null : (
          <Button onClick={toggleModal}> Editar Perfil </Button>
        )}

        <Modal isOpen={isModal} closeModal={toggleModal}>
          {ownUser !== undefined ? (
            <EditProfile modal={toggleModal} ownUser={user} />
          ) : null}
        </Modal>
        {user ? (
          <>
            <Avatar sx={{ width: '96px', height: '96px' }} src={user.image} />
            <Typography variant='h4'>
              {user.name} {user.lastname}
            </Typography>
            <Typography variant='h6'>{user.username}</Typography>
            <Typography>Mis posts!</Typography>
            {Array.isArray(posts) ? (
              posts.map(post => {
                return (
                  <div>
                    <Post post={post}></Post>
                    {/* <button
                    onClick= {toggleModal}>
                    {' '}
                    editar
                  </button> */}
                    {/* <Modal isOpen={isModal} closeModal={closeModal}>
                    <PostAPet isOpen={isModal} closeModal={closeModal} />
                  </Modal> */}
                    <Button
                      variant='contained'
                      onClick={() => handleClick(post._id)}>
                      {' '}
                      Eliminar
                    </Button>
                  </div>
                )
              })
            ) : (
              <Typography>No hay publicaciones disponibles</Typography>
            )}
          </>
        ) : (
          ''
        )}
      </Box>
    )
  }
  //  else{
  //    return(
  //      <div></div>
  //    )
  //  }
}
