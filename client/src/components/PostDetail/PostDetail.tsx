import { useEffect, useRef, useState } from 'react'
import { PostType, conversation } from '../../redux/types/types'
import { useDispatch, useSelector } from 'react-redux'
import { typeState } from '../../redux/reducers/index'
import { getPosts } from '../../redux/actions'
import { useHistory, useParams } from 'react-router'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import capitalize from '@mui/utils/capitalize'
import axios from 'axios'
import useUser from '../../hooks/useUser'
import { Modal } from '../Modal'
import EditPost from '../../components/EditPost'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Hidden, InputLabel } from '@mui/material'
import Swal from 'sweetalert2';

export default function ImgMediaCard() {
  const { id } = useParams<{ id?: string }>()

  const dispatch = useDispatch()
  let allPosts = useSelector((state: typeState) => state.filteredPosts)
  const history = useHistory()
  const [result] = useUser()
  const idSender = localStorage.getItem('userId')
  const scrollRef = useRef<any>()
  //console.log(allPosts)
  const [report, setReport] = useState<number>(0)
  let [isModal, setIsModal] = useState(false)

  const toggleModal = function () {
    setIsModal((isModal = !isModal))
  }

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, isModal])

  useEffect(() => {
    scrollRef.current?.scrollIntoView(false, { behavior: 'auto' })
  }, [])
  const handleCounter = async function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    })

    async function report() {
      let counter: any = await axios.put(`/post/report?id=${id}`)
      //console.log(counter.data.reportCounter);
      setReport(counter.data.reportCounter)
    }

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas seguro?',
        text: 'Si denuncias esta publicacion probablemente sea borrada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, reportarla!',
        cancelButtonText: '¡No, cambié de opinión!',
        reverseButtons: true,
      })
      .then(result => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Bien!',
            'La publlicación fue denunciada correctamente',
            'success'
          )
          report()

          history.push('/home/feed') //santi ponele estilos
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '¡Bien!',
            'Esta publicación seguirá estando disponible',
            'error'
          )
        }
      })
    setReport(0)
  }

  let detailpost = allPosts.find((elem: PostType) => elem._id === id)
  const contact = async () => {
    if (result !== 'Unauthorized') {
      if (detailpost) {
        const conver: conversation = (
          await axios.get(
            `/conversation?ida=${idSender}&idb=${detailpost.user}`
          )
        ).data[0]
        if (typeof conver !== 'string') {
          history.push(`/home/messenger/${conver._id}`)
        } else {
          const newConver: conversation = (
            await axios.post('/conversation', {
              idRec: detailpost.user,
              idEnv: idSender,
            })
          ).data
          history.push(`/home/messenger/${newConver._id}`)
        }
      }
    }
  }

  if (detailpost !== undefined) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 'max-content',
          paddingTop: '50px',
          paddingBottom: '50px',
          minHeight: '71vh',
        }}>
        {report ? (
          report > 0 ? (
            <span>Reportado</span>
          ) : null
        ) : null}
        <Card
          elevation={5}
          sx={{
            maxWidth: 345,
            minWidth: '20vw',
            // marginTop: 45,
            // marginBottom: 54,
          }}>
          
          <CardMedia
            ref={scrollRef}
            component='img'
            alt={detailpost.type}
            sx={{
              maxHeight: 300,
              minHeight: 250,
            }}
            image={`${detailpost.petImage.url}`}
          />

          <CardContent>
            {detailpost.name ? (
              <Typography
                sx={{ textAlign: 'center' }}
                gutterBottom
                variant='h4'
                component='div'>
                {detailpost.name}
              </Typography>
            ) : null}
            <Typography gutterBottom variant='h5' component='div'>
              Tipo: {capitalize(detailpost.type)}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              Estado: {capitalize(detailpost.state)}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              Género: {capitalize(detailpost.genre)}
            </Typography>
            {/* <Typography gutterBottom variant='h6' component='div'>
              Fecha de publicacion: {capitalize(detailpost.date)}
            </Typography> */}
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{
                width: '100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {detailpost.description}
            </Typography>
          </CardContent>
          {detailpost.user !== idSender ? (
            <>
              <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={contact} size='small'>
                  Contactar
                </Button>
              </CardActions>
              {result !== 'Unauthorized' ?<FormControl sx={{ m: 1, minWidth: '12vw' }}>
                <InputLabel>Reportar</InputLabel>
                <Select label='Reportar' onChange={handleCounter}>
                  <MenuItem value='Spam'>Spam</MenuItem>
                  <MenuItem value='Contenido Inapropiado'>
                    Contenido inapropiado
                  </MenuItem>
                </Select>
              </FormControl>: null}
            </>
          ) : (
            <div>
              <Button
                sx={{ marginBottom: '10px' }}
                variant='contained'
                onClick={toggleModal}>
                Editar
              </Button>
              <Modal isOpen={isModal} closeModal={toggleModal}>
                <EditPost />
              </Modal>
            </div>
          )}
        </Card>
      </div>
    )
  } else {
    return <>Cargando...</>
  }
}
