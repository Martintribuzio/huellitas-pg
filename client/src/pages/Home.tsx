import './Home.scss';
import { Fade } from 'react-awesome-reveal';
import pets from '../assets/home/pets2.png';
import post1 from '../assets/home/post1.svg';
import post2 from '../assets/home/post2.svg';
import post3 from '../assets/home/post3.svg';
import { useState } from 'react';
import Card from './Card';

export const Home = () => {
  return (
    <div className='Home__container'>
      <section className='Primary'>
        <div className='Description'>
          <h1> In order to seek the best for the animals of the world! </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            dolores consequuntur sequi ab neque quam eum, hic qui doloremque sed
            laboriosam voluptas, labore voluptatum illo placeat id odio ipsum
            pariatur.
          </p>
          <button>Registrate</button>
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
    </div>
  );
};
