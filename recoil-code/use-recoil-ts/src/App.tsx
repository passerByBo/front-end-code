import React, { FC } from 'react';
import { atom, useRecoilValue, useRecoilState, selector } from './recoil'

const textState = atom<string>({
  key: 'textState',
  default: 'shixiaobo'
})
const charCountState = selector<string>({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text + '🏮' + Math.random();
  },
});
const App: FC = () => {
  // const text = useRecoilValue(textState);
  const [text, setText] = useRecoilState(textState);
  const value = useRecoilValue(charCountState);

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    setText('石晓波'+ '🏮' + Math.random() )
  }
  return <div>
    {/* <input type="text" value={text} onChange={onChange} /> */}
    <h1>{text}</h1>
    <h2>{value}</h2>
    <button onClick={handleClick}>点击修改</button>
  </div>

}

export default App;
