import { PostType } from '../redux/types/types';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import dotenv from 'dotenv';
dotenv.config();

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,

  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0,
    },

    // "& .tuki": {
    //   display: 'none'
    // },
    // "& .tuki2": {
    //   display:'block'
    // }
    // }

    // "& .MuiImageMarked-root": {
    //   opacity: 1
    // },
    // "& .MuiTypography-root": {
    //   border: "4px solid currentColor"
    // }
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

export default function Post({ post }: { post: PostType }) {
  // return (
  //   <>
  //     {typeof props.petImage === 'string' && props.petImage ? (
  //       <img src={`http://localhost:3001/${props.petImage}`}></img>
  //     ) : (
  //       ''
  //     )}
  //     <img
  //       className={styles.img}
  //       alt={''}
  //       src={`http://localhost:3001/${props.petImage}`}
  //     />
  //     <p>
  //       {props.name !== undefined
  //         ? `Nombre: ${props.name}`
  //         : 'nombre desconocido'}
  //     </p>
  //     <p>{`Descripcion: ${props.description}`}</p>
  //     <p>{`Fecha: ${props.date}`}</p>
  //     <p>{`Genero: ${props.genre}`}</p>
  //     <p>{`Animal: ${props.type}`}</p>
  //     <p>{`Estado: ${props.state}`}</p>
  //   </>
  // );
  if (typeof post.petImage === 'string') {
    if (post.petImage.search(/\\/)) {
      post.petImage = post.petImage.replace(/\\/g, '/');
    }
  }
  return (
    <Link to={`/home/detail/${post._id}`}>
      <ImageButton
        focusRipple
        key={post.description}
        style={{
          width: '30vw',
          margin: '10px',
        }}
        sx={{ minHeight: 200, minWidth: 200 }}>
        <ImageSrc
          style={{
            backgroundImage: `url(${post.petImage.url})`,
          }}
        />
        <ImageBackdrop className='MuiImageBackdrop-root' />
        <Image>
          <Typography
            component='span'
            variant='subtitle1'
            color='inherit'
            sx={{
              position: 'relative',
              p: 5,
              pt: 2,
              pb: theme => `calc(${theme.spacing(1)} + 6px)`,
            }}>
            {post.name}
          </Typography>
        </Image>
      </ImageButton>
    </Link>
  );
}

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
// ];
// import { PostType } from "../redux/types/types"
// import styles from '../CSS/Post.module.css'

// export default function Post(props: PostType){
//     console.log("PROPS", props)
//     return(
//         <div className = {styles.divCard}>
//             {/* {typeof props.petImage === "string" && props.petImage?<img src = {`http://localhost:3001/${props.petImage}`}></img> : ""} */}
//             <img className={styles.img} src = {`http://localhost:3001/${props.petImage}`}/>
//             <p>{`Descripcion: ${props.description}`}</p>
//             <p>{`Fecha: ${props.date}`}</p>
//             <p>{`Genero: ${props.genre}`}</p>
//             <p>{`Animal: ${props.animal}`}</p>
//             <p>{`Estado: ${props.postType}`}</p>
//         </div>
//     )
// }
