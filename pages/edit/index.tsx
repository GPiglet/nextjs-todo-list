import * as React from 'react';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { UserContext, UserType } from '../../contexts/UserContext';
import MainWrapper from '../../components/Layout/MainWrapper';

export const EditPage: NextPage = () => {
  const router = useRouter();
  const userContext = React.useContext(UserContext);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [username, setUsername] = React.useState<any>('');
  const [email, setEmail] = React.useState<any>('');
  const [address, setAddress] = React.useState<any>('');
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const uid:any = router.query.uid;
  React.useEffect(() => {
    if ( uid )
    {
      const selectedUser = userContext.list.filter((user)=>user.id==uid)[0];
      setUsername(selectedUser.username);
      setEmail(selectedUser.email || '');
      setAddress(selectedUser.address || '');
    }
  }, [uid])

  const onSave = () => {
    if ( !username )
    {
      setOpenSnackbar(true);
      return;
    }
    if ( uid )
    {
      let selectedUser = userContext.list.filter((user)=>user.id==uid)[0];
      selectedUser.username = username;
      selectedUser.email = email;
      selectedUser.address = address;
    }
    else
    {
      const users = userContext.list;
      let id:number = users.length;
      users.forEach((user) => {
        if ( user.id >= id ) id = user.id + 1;
      })
      userContext.push([{
        id,
        username,
        email,
        address
      }], false);
    }
    router.push('/');
  }
  const onCancel = () => {
    router.push('/');
  }

  const menus = [
    {
      title: 'Save',
      clickHandle: onSave
    },

    {
      title: 'Cancel',
      clickHandle: onCancel
    }
  ];

  return (
    <MainWrapper menus={menus} maxWidth="xs">
      <Box>
        <TextField
          margin="normal"
          required
          id="username"
          label="Username"
          name="username"
          fullWidth
          autoComplete="Username"
          autoFocus
          value={username}
          onChange={onUsernameChange}
        />
        <TextField
          margin="normal"
          id="email"
          label="Email Address"
          name="email"
          fullWidth
          autoComplete="email"
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          margin="normal"
          id="address"
          label="Address"
          name="address"
          fullWidth
          autoComplete="address"
          value={address}
          onChange={onAddressChange}
        />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={()=>setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: 10,
        }}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          Please input username.
        </Alert>
      </Snackbar>
    </MainWrapper>
  )
}

const Edit: NextPage = () => {
  return <EditPage />
}

export default Edit
