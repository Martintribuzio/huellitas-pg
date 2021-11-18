import './Home.scss';
import { Fade } from 'react-awesome-reveal';
import pets from '../assets/home/pets2.png';
import post1 from '../assets/home/post1.svg';
import post2 from '../assets/home/post2.svg';
import post3 from '../assets/home/post3.svg';
import post4 from '../assets/home/iconoDeAbajo.svg';
import post5 from '../assets/home/iconoDeAbajo2.svg';
import post6 from '../assets/home/iconoDeAbajo3.svg';
import Card from './Card';
import Textra from 'react-textra';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CardChiquita from './CardChiquita';
import useUser from '../hooks/useUser';

import { useEffect, useState } from 'react';


const data = [
  /* 'Toda la informacion sobre los pets',
  'Encontra tu perro perdido',
  'Publica el gato que encontraste', */
  '¿Buscás a tu mascota perdida?',
  'Te encontraste la mascota de alguien más.',
  '¿Tenés animales buscando un hogar?',
  'Tu ayuda es importante.',
];

export const Home = () => {

  const [user] = useUser();


  const [result] = useUser();
  const [conexion, setConexion] = useState(result);
  useEffect(() => {
    setConexion(result);
  } ,[result]);

  return (
    <div className='Home__container'>
      <section className='Primary'>
        <div className='Description' style={{ width: '80%' }}>
          <Textra className='Textra' effect='leftRight' data={data} />
          <Typography>
            Huellitas es una comunidad formada por personas con el mismo
            objetivo, ayudar a los animales a encontrar el camino de regreso a
            su hogar.
          </Typography>

          {conexion === 'Unauthorized' ? 
          <div style = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',gap: '30px', minWidth: "200px"}}>
         <Link style={{ textDecoration: 'none' }} to='/login'>
            <Button variant='contained' style = {{width: '6vw', minWidth: '200px'}}>Iniciar Sesión</Button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/register'>
            <Button variant='contained' style = {{width: '6vw', minWidth: '200px'}}>Regístrate</Button>
          </Link>
          </div> : null}

        </div>
        <div className='Images'>
          <img src={pets} alt='' />
        </div>
      </section>

      <section className='Secondary'>
        <Fade>
          <div className='Description'>
            <Typography variant='h4'>
              {' '}
              ¿Qué puedo hacer en Huellitas?{' '}
            </Typography>
            <Typography>
              En huellitas podrás recurrir a la ayuda de otros miembros de la
              comunidad para encontrar a tu mascota perdida, publicar una
              mascota que encontraste y ayudar a otros a encontrar a una mascota
              que está buscando un hogar. Contamos con tres categorías para
              publicar:
            </Typography>
          </div>
        </Fade>
        <div className='Posts'>
          <Fade direction='up' triggerOnce className='Fade'>
            <Card
              type='Encontrado'
              img={post2}
              description={
                '¿Encontraste la mascota de alguien más? Podes ayudarla a volver con sus dueños.'
              }
            />
          </Fade>
          <Fade direction='up' triggerOnce className='Fade'>
            <Card
              type='Perdido'
              img={post3}
              description={
                '¿Se perdió tu mejor amigo? Acá podrás dar aviso a los miembros de la comunidad cercanos a tu zona para que te ayuden con la búsqueda.'
              }
            />
          </Fade>
          <Fade direction='up' triggerOnce className='Fade'>
            <Card
              type='En adopción'
              img={post1}
              description={
                'Muchos refugios tienen animales buscando  un hogar. En Huellitas podrás contactarte con ellos para encontrar a tu amigo ideal.'
              }
            />
          </Fade>
        </div>
      </section>

      <Fade direction='up' triggerOnce className='Fade'>
        <section className='Secondary3'>
          <div className='Posts2'>
            <Fade direction='up' triggerOnce className='Fade'>
              <CardChiquita
                type='35+'
                img={post4}
                description={'En adopción'}
              />
            </Fade>
            <Fade direction='up' triggerOnce className='Fade'>
              <CardChiquita
                type='50+'
                img={post6}
                description={'En búsqueda'}
              />
            </Fade>
            <Fade direction='up' triggerOnce className='Fade2'>
              <CardChiquita
                type='450+'
                img={post5}
                description={'Encontrado'}
              />
            </Fade>
          </div>
          {conexion === 'Unauthorized' ? 
          <div className='Description2'>
            <Typography variant='h4'>
              Si querés formar parte de esta comunidad, podés registrarte y
              comenzar a publicar.
            </Typography>
            <Typography>
              Juntando nuestras "patitas" podemos ayudar a que todas las
              mascotas tengan su hogar.
            </Typography>
              
            
          <div style = {{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',gap: '30px', minWidth: "200px"}}>
         <Link style={{ textDecoration: 'none' }} to='/login'>
            <Button variant='contained' style = {{width: '6vw', minWidth: '200px'}}>Iniciar Sesión</Button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to='/register'>
            <Button variant='contained' style = {{width: '6vw', minWidth: '200px'}}>Regístrate</Button>
          </Link>
          </div> 
          </div>: <div className='Description2'>
            <Typography variant='h4'>
              Gracias por ser parte de nuestra comunidad. Ya podes empezar a 
              publicar.
            </Typography>
            <Typography>
              Juntando nuestras "patitas" podemos ayudar a que todas las
              mascotas tengan su hogar.
            </Typography> 

        </div>}
      </section>
    </Fade>
    </div>
  );}
