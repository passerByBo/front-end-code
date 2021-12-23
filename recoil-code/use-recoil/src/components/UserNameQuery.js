import { useRecoilValue } from 'recoil';
import { userNameQuery } from '../stores/userNameQuery';
console.log(userNameQuery)
export default function UserNameQuery() {
    let useName = useRecoilValue(userNameQuery('我的id'));
    return <p>{useName}</p>
}