import '../styles/globals.css'
import * as React from 'react';
import type { AppProps } from 'next/app'
import UserType from '../Types/UserType'
import UserContext  from '../contexts/UserContext';
import UserApi from '../services/User';

function MyApp({ Component, pageProps }: AppProps) {
  const [users, setUsers] = React.useState<Array<UserType>>([]);
  const pushUsers = (newUsers: Array<UserType>, isReset: boolean) => {
      if ( isReset )
          setUsers(newUsers);
      else
          setUsers((prevUsers) => [...prevUsers, ...newUsers]);
  };

  React.useEffect(() => {
    UserApi.getList((res: any) => {
      setUsers(res);
    })
  }, []);

  return (
    <UserContext.Provider value={{list: users, push: pushUsers}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
  
}

export default MyApp
