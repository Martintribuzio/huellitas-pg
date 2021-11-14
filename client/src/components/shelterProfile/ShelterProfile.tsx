import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeState } from '../../redux/reducers/index';
import { getUser } from '../../redux/actions';
import { useHistory, useParams } from 'react-router';

export default function ShelterProfile() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [shelter, setShelter] = useState();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const user = useSelector((state: typeState) => state.user);
  const [shelterProfile, setShelterProfile] = useState(shelter);

  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
}
