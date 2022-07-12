import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { UserContext, UserType } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [users, setUsers] = React.useState<Array<UserType>>([
    {
      id: 1,
      username: 'SmartDev',
      email: 'smartdev@gmail.com',
    },

    {
      id: 2,
      username: 'Piglet',
      email: 'piglet@gmail.com',
    },

    {
      id: 4,
      username: 'koala',
      email: 'koala@gmail.com',
    }
  ]);
  const pushUsers = (newUsers: Array<UserType>, isReset: boolean) => {
      if ( isReset )
          setUsers(newUsers);
      else
          setUsers([...users, ...newUsers]);
  };

  return (
    <UserContext.Provider value={{list: users, push: pushUsers}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
  
}

export default MyApp
