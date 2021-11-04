import './Home.scss';
import { Fade } from 'react-awesome-reveal';
import pets from '../assets/home/pets2.png';
import post1 from '../assets/home/post1.svg';
import post2 from '../assets/home/post2.svg';
import post3 from '../assets/home/post3.svg';
import post4 from '../assets/home/iconoDeAbajo.svg'
import post5 from '../assets/home/iconoDeAbajo2.svg'
import post6 from '../assets/home/iconoDeAbajo3.svg'
import { useState,useEffect} from 'react';
import Card from './Card';
import Textra from 'react-textra';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CardChiquita from './CardChiquita';
import useUser from '../hooks/useUser';
import { useDispatch } from 'react-redux';
import { getConvers } from '../redux/actions';

const data = [
  'Toda la informacion sobre los pets',
  'Encontra tu perro perdido',
  'Publica el gato que encontraste',
];

export const Home = () => {
  const [loading, result] = useUser();
  const dispatch = useDispatch()

  useEffect(() => {
    if(result !== 'Unauthorized'){
      const id = localStorage.getItem('userId');
      if(id){
        dispatch(getConvers(id));
      }
      }}, [dispatch,result]);

  return (
    <div className='Home__container'>
      <section className='Primary'>
        <div className='Description'>
          <Textra className='Textra' effect='leftRight' data={data} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            dolores consequuntur sequi ab neque quam eum, hic qui doloremque sed
            laboriosam voluptas, labore voluptatum illo placeat id odio ipsum
            pariatur.
          </p>
          <Link style={{ textDecoration: 'none' }} to='/login'>
            <Button variant='contained'>Registrate</Button>
          </Link>
        </div>
        <div className='Images'>
          <img src={pets} alt='' />
        </div>
      </section>

      <section className='Secondary'>
        <div className='Description'>
          <h1> Services available to the community </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            sapiente consequuntur corporis temporibus provident doloribus ex
            fugit aut possimus, qui tempora vitae error asperiores omnis,
            voluptas impedit! Ipsam, asperiores neque?
          </p>
        </div>
      </section>
      <div className='Posts'>
        <Fade direction='up' triggerOnce className='Fade'>
          <Card
            type='Encontrado'
            img={post2}
            description={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolores consequuntur sequi ab neque quam eum.'
            }
          />
        </Fade>
        <Fade direction='up' triggerOnce className='Fade'>
          <Card
            type='Perdido'
            img={post3}
            description={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolores consequuntur sequi ab neque quam eum.'
            }
          />
        </Fade>
        <Fade direction='up' triggerOnce className='Fade'>
          <Card
            type='En adopción'
            img={post1}
            description={
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolores consequuntur sequi ab neque quam eum.'
            }
          />
        </Fade>
      </div>

      <Fade direction='up' triggerOnce className='Fade'>    
      <section className='Secondary3'>
      <div className='Posts2'>
        <Fade direction='up' triggerOnce className='Fade'>
          <CardChiquita
            type='35+'
            img={post4}
            description={
              'En adopcion'
            }
          />
        </Fade>
        <Fade direction='up' triggerOnce className='Fade'>
          <CardChiquita
            type='50+'
            img={post6}
            description={
              'En busqueda'
            }
          />
        </Fade>
        <Fade direction='up' triggerOnce className='Fade2'>
          <CardChiquita
            type='450+'
            img={post5}
            description={
              'Encontrado'
            }
          />
        </Fade>
      </div>
      <div className='Description2'>
          <h1> In order to seek the best for the animals in the world</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
            sapiente consequuntur corporis temporibus provident doloribus ex
            fugit aut possimus, qui tempora vitae error asperiores omnis,
            voluptas impedit! Ipsam, asperiores neque?
          </p>
          <button>Registrate</button>
        </div>
      </section>
      </Fade>
    </div>
  );
};
