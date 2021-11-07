import Conversation from './Conversation';
import { useSelector } from 'react-redux';
import { conversation } from '../../redux/types/types';
import { typeState } from '../../redux/reducers/index';

export default function Conversations(){
    const convers:Array<conversation> = useSelector((state:typeState) => state.conversations);
    return(
        <div>
            {convers.length? convers.map((c:any) => (
                  <Conversation conversation={c} />
            )):null}
        </div>
    )
}