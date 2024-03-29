import React, { useState } from 'react';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import mobileImage from '../../utills/images/mobile.png';
import { useSnackbar } from 'notistack';
import { NavLink, useNavigate } from 'react-router-dom';
import { loadUser } from '../../reducers/userReducers';
import { useDispatch } from 'react-redux';
const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const submitData = () => {
    if (!data.username || !data.password) {
      enqueueSnackbar('Please fill all the fields to proceed', {
        variant: 'error',
      });
      return;
    }
    dispatch(loadUser(data));
    enqueueSnackbar('Registered Successfully', {
      variant: 'success',
    });
    navigate('/signin');
  };

  return (
    <Box sx={{ flexDirection: { xs: 'column', md: 'row' } }} display={'flex'}>
      <Box
        height={'100vh'}
        sx={{ display: { xs: 'none', md: 'block' } }}
        bgcolor={'lightpink'}
        flex={'4'}
      >
        <img src={mobileImage} width={'100%'} alt="mobile icon" />
      </Box>
      <Box flex={'5'} sx={{ p: { xs: '15px', lg: '24px' } }}>
        <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
          <Box
            fontWeight={'semibold'}
            sx={{
              fontSize: { xs: '12px', sm: '11px', md: '12px', lg: '15px' },
            }}
          >
            Already Register?
          </Box>
          <NavLink style={{ textDecoration: 'none' }} to={'/signin'}>
            <Box
              sx={{
                fontSize: { xs: '12px', sm: '11px', md: '12px', lg: '15px' },
                cursor: 'pointer',
              }}
              color="blue"
            >
              Sign in now
            </Box>
          </NavLink>
        </Stack>
        <Stack mt="70px">
          <Typography
            sx={{ fontSize: { xs: '25px', sm: '34px', md: '40px' } }}
            fontWeight={'bold'}
            textAlign={'center'}
          >
            Sign Up
          </Typography>
          <Stack
            sx={{ width: { xs: '97%', md: '90%', lg: '80%' } }}
            height={'50vh'}
            direction={'column'}
            justifyContent={'center'}
            mx={'auto'}
          >
            <Stack>
              <Typography
                sx={{
                  fontSize: { xs: '13px', sm: '14px', md: '15px', lg: '16px' },
                }}
                fontWeight={'bold'}
              >
                Username
              </Typography>
              <TextField
                size="small"
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
            </Stack>
            <Stack sx={{ marginTop: { xs: '6px', md: '14px' } }}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '13px',
                      sm: '14px',
                      md: '15px',
                      lg: '16px',
                    },
                  }}
                  fontWeight={'bold'}
                >
                  Password
                </Typography>
              </Stack>
              <TextField
                size="small"
                type="password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                InputProps={{
                  style: {
                    borderRadius: '8px',
                  },
                }}
              />
            </Stack>
            <Button
              sx={{
                color: '#fff',
                borderRadius: '10px',
                fontSize: { xs: '12px', sm: '13px', md: '14px' },
                mt: 2,
                backgroundColor: 'rgb(234, 76, 138)',
                '&:hover': {
                  backgroundColor: 'rgb(234, 76, 138)',
                },
              }}
              variant="contained"
              onClick={submitData}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUp;
