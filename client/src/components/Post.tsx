import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarBelowImageList() {
  return (
    <ImageList sx={{ width: 500,}}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={<span>by: {item.author}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  }
];
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
