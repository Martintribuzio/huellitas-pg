interface CardProps {
  type: string;
  description: string;
  img: string;
}

const CardChiquita = (props: CardProps) => {
  return (
    <div className='card2'>
      <div className='cardImage'>
        <img
          style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.2))' }}
          src={props.img}
          alt='post'
        />
      </div>
      <h3>{props.type}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default CardChiquita;
