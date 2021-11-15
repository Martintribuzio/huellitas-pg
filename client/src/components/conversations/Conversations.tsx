import Conversation from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { conversation } from '../../redux/types/types';
import { typeState } from '../../redux/reducers/index';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { getConvers } from '../../redux/actions';
import style from '../Messages/Message.module.css';
import { SpinnerCircular } from 'spinners-react';

export default function Conversations(props: any) {
  const convers: Array<conversation> = useSelector(
    (state: typeState) => state.conversations
  );
  const id = localStorage.getItem('userId');
  const dispatch = useDispatch();
  console.log(props.mobile);
  const [loading, result] = useUser();

  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    if (result !== 'Unauthorized') {
      if (id) {
        dispatch(getConvers(id));
      }
    }
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className={style.conv}>
        <SpinnerCircular color='#ffff' />
      </div>
    );
  }

  const display = props.mobile && visibility ? 'none' : 'block';

  return (
    <div
      style={{
        display: display,
      }}
      className={style.conv}>
      {convers.length && Array.isArray(convers) && result !== 'Unauthorized'
        ? convers.map((c: any) => <Conversation conversation={c} />)
        : null}
    </div>
  );

  // return (
  //   <div className={style.noConv}>
  //     <p>No has iniciado ninguna conversación</p>
  //   </div>
  // );
}
