import './App.css';
import { Box } from '@mui/material';
import { customerData,loadUser } from './reducers/userReducers';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('customers') !== null) {
        let user = JSON.parse(localStorage.getItem('customers') ?? '{}');
        dispatch(customerData(user));
      }
      if (localStorage.getItem('users') !== null) {
        let users = JSON.parse(localStorage.getItem('users') ?? '{}');
        dispatch(loadUser(users));
      }
    })();
  }, []);
  return (
    <SnackbarProvider maxSnack={3}>
      <Outlet />
    </SnackbarProvider>
  );
}

export default App;
