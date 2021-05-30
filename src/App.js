import React from 'react';

import Login from './components/Login';
import Menu from './components/Menu';

function App() {

  const [isAuth, setIsAuth] = React.useState(localStorage.getItem("centraleito-token"));

  return (
    <>
      {
        isAuth === null || isAuth === undefined ? <Login setIsAuth={setIsAuth} /> :
          <Menu setIsAuth={setIsAuth} />
      }
    </>
  );
}

export default App;
