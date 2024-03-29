import React, { useState } from 'react';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import signimage from '../../utills/images/sign.png';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignIn = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const selector = useSelector((state) => state);
  const login = () => {
    if (!selector.user) {
      enqueueSnackbar('User does not exists', {
        variant: 'error',
      });
      return;
    }
    if (
      data.username === selector?.user?.username &&
      data.password === selector?.user?.password
    ) {
      navigate('/');
      enqueueSnackbar('login Successfully', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Invalid Email or Password', {
        variant: 'error',
      });
    }
  };
  return (
    <Box display="flex" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Box
        width={'full'}
        height={'100vh'}
        bgcolor={'lightpink'}
        sx={{ display: { xs: 'none', md: 'block' } }}
        margin={'auto'}
        flex={'4'}
      >
        <img
          width={'100%'}
          style={{ margin: 'auto' }}
          src={signimage}
          alt="icon"
        />
      </Box>
      <Box flex={'5'} p={3}>
        <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
          <Box
            fontWeight={'semibold'}
            sx={{
              fontSize: { xs: '12px', sm: '11px', md: '12px', lg: '15px' },
            }}
          >
            Not a member?
          </Box>
          <NavLink style={{ textDecoration: 'none' }} to="/signup">
            <Box
              sx={{
                fontSize: { xs: '12px', sm: '11px', md: '12px', lg: '15px' },
                cursor: 'pointer',
              }}
              color="blue"
            >
              Sign up now
            </Box>
          </NavLink>
        </Stack>
        <Stack
          sx={{ width: { xs: '97%', md: '90%', lg: '80%' } }}
          mt={'80px'}
          mx={'auto'}
        >
          <Box
            fontSize={'24px'}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
            fontWeight={'bold'}
          >
            Sign in to Dribbble
          </Box>
          <Stack direction={'row'} mt={3} spacing={2} alignItems={'center'}>
            <Button
              startIcon={<GoogleIcon />}
              sx={{
                backgroundColor: '#4186f5',
                '&:hover': {
                  backgroundColor: '#4186f5',
                },
                width: '100%',
                color: 'white',
                fontSize: '11px',
                py: '10px',
                borderRadius: '10px',
                fontWeight: 'normal',
              }}
            >
              Sign in with Google
            </Button>
            <Box
              width={'46px'}
              height={'40px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'#f2f2f2'}
              borderRadius={'10px'}
            >
              <TwitterIcon fontSize="26px" />
            </Box>
          </Stack>
          <Stack direction={'row'} my={4} spacing={2} alignItems={'center'}>
            <Box width={'46%'} bgcolor={'#ddd'} height={'2px'}></Box>
            <Typography fontSize={'17px'}>or</Typography>
            <Box width={'46%'} bgcolor={'#ddd'} height={'2px'}></Box>
          </Stack>
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
                  fontSize: { xs: '13px', sm: '14px', md: '15px', lg: '16px' },
                }}
                fontWeight={'bold'}
              >
                Password
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '12px' }, cursor: 'pointer' }}
                fontWeight={500}
                color={'rgb(67 40 206)'}
              >
                Forget Password?
              </Typography>
            </Stack>
            <TextField
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              size="small"
              type="password"
              InputProps={{
                style: {
                  borderRadius: '8px',
                },
              }}
            />
          </Stack>
          <Button
            sx={{
              width: { xs: '100%', md: '40%' },
              color: '#fff',
              fontSize: { xs: '12px', sm: '13px', md: '14px' },
              mt: 2,
              backgroundColor: 'rgb(234, 76, 138)',
              '&:hover': {
                backgroundColor: 'rgb(234, 76, 138)',
              },
            }}
            onClick={login}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignIn;
