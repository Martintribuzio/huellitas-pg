import { PostType } from '../redux/types/types';
import styles from '../CSS/Post.module.css';

export default function Post(props: PostType) {
  return (
    <>
      {typeof props.petImage === 'string' && props.petImage ? (
        <img src={`http://localhost:3001/${props.petImage}`}></img>
      ) : (
        ''
      )}
      <img
        className={styles.img}
        alt={''}
        src={`http://localhost:3001/${props.petImage}`}
      />
      <p>
        {props.name !== undefined
          ? `Nombre: ${props.name}`
          : 'nombre desconocido'}
      </p>
      <p>{`Descripcion: ${props.description}`}</p>
      <p>{`Fecha: ${props.date}`}</p>
      <p>{`Genero: ${props.genre}`}</p>
      <p>{`Animal: ${props.type}`}</p>
      <p>{`Estado: ${props.state}`}</p>
    </>
  );
}
