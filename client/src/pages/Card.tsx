interface CardProps {
  type: string;
  description: string;
  img: string;
}

const Card = (props: CardProps) => {
  return (
    <div className='card'>
      <div className='cardImage'>
        <img src={props.img} alt='post' />
      </div>
      <h3>{props.type}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default Card;
