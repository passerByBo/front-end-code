import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import React, { Suspense } from 'react';
import CurrentUserInfo from './components/CurrentUserInfo';
import UserNameQuery from './components/UserNameQuery';
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>传参数加载中。。。</div>}>
        <UserNameQuery />
      </Suspense>
      <Suspense fallback={<div>加载中。。。</div>}>
        <CurrentUserInfo />
      </Suspense>
      <TodoList />
    </div>
  );
}

export default App;
