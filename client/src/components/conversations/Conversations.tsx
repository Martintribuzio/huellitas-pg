import Conversation from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { conversation } from '../../redux/types/types';
import { typeState } from '../../redux/reducers/index';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import axios from 'axios';
import { getConvers } from '../../redux/actions';
import style from '../Messages/Message.module.css';
import { useHistory } from 'react-router';

export default function Conversations() {
  const convers: Array<conversation> = useSelector(
    (state: typeState) => state.conversations
  );
  const id = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, result] = useUser();

  useEffect(() => {
    if (result !== 'Unauthorized') {
      if (id) {
        dispatch(getConvers(id));
      }
    }
    else{
      history.push('/login');
    }
  }, [id]);

  if (convers.length && Array.isArray(convers) && result !== 'Unauthorized') {
    return (
      <div className={style.conv}>
        {convers.length
          ? convers.map((c: any) => <Conversation conversation={c} />)
          : null}
      </div>
    );
  } else {
    return <p>No conversations</p>;
  }
}
