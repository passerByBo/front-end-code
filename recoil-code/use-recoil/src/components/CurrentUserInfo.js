import {currentUserNameQuery} from '../stores/currentUserNameQuery';
import {useRecoilValue} from 'recoil';
export default function CurrentUserInfo() {
    const userName = useRecoilValue(currentUserNameQuery);
    return <div>{userName}</div>;
  }