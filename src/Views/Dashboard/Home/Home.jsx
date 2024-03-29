import React, { useState } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Navbar from '../../../Components/Navbar/Navbar';
import Table from '../../../Components/Table/Table';
import { Box, Stack, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSnackbar } from 'notistack';
import Modal from '@mui/material/Modal';
import { customerData } from '../../../reducers/userReducers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Home = () => {
  const [item, setItem] = useState('Home');
  const [data, setData] = useState({
    name: '',
    description: '',
  });
  const [userData, setUserData] = useState([]);
  const [custmerName, setCustomerName] = useState('');
  const selector = useSelector((state) => state);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [bool, setBool] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setData({
      name: '',
      description: '',
    });
    setBool(false);
    setOpen(false);
  };
  const CreateUser = () => {
    if (!data.name || !data.description) {
      enqueueSnackbar('Please fill all the fields to proceed', {
        variant: 'error',
      });
      return;
    }
    const selectorValue = selector?.value || [];
    setUserData((prevData) => [...prevData, data]);
    dispatch(customerData([...selectorValue, data]));

    // Clear input fields and show success message
    setData({
      name: '',
      description: '',
    });
    enqueueSnackbar('User Created successfully', { variant: 'success' });
  };
  const deleteData = (name) => {
    const filterData = selector?.value?.filter((item) => {
      return name !== item?.name;
    });
    dispatch(customerData(filterData));
    enqueueSnackbar('User Deleted successfully', { variant: 'success' });
  };

  const editCustomer = (item) => {
    setOpen(true);
    setBool(true);
    setCustomerName(item.name);
    setData({
      name: item.name,
      description: item.description,
    });
  };

  const UpdateCustomer = () => {
    const update = selector?.value?.map((item) => {
      if (item.name === custmerName) {
        if (!data.name || !data.description) {
          enqueueSnackbar('Please fill all the fields to proceed further', {
            variant: 'error',
          });
          return item;
        }
        // Update data for the specific item
        return {
          ...item,
          name: data.name,
          description: data.description,
        };
      } else {
        return item;
      }
    });

    // Execute actions after mapping is completed
    setOpen(false); // Close modal
    enqueueSnackbar('Updated successfully', { variant: 'success' }); // Show success message

    // Update state and dispatch action with updated data
    setUserData(update);
    dispatch(customerData(update));
  };

  return (
    <Box height={'100vh'}>
      <Navbar setToggle={setToggle} item={item} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: { xs: '90%', sm: '350px' },
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <h2 id="child-modal-title">
              {bool ? 'Update User' : 'Create User'}
            </h2>
            <Box
              onClick={() => {
                handleClose();
              }}
              sx={{ cursor: 'pointer' }}
            >
              <CloseIcon />
            </Box>
          </Stack>
          <Stack gap={2} marginTop={'30px'}>
            <TextField
              sx={{ width: '100%' }}
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
              placeholder="Name"
              size="small"
            />
            <TextField
              sx={{ width: '100%' }}
              value={data.description}
              placeholder="Descriptoin"
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
              size="small"
            />
            {bool ? (
              <Button onClick={UpdateCustomer} variant="contained">
                Update Customer{' '}
              </Button>
            ) : (
              <Button onClick={CreateUser} variant="contained">
                Create
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>
      <Stack overflow={'hidden'} direction={'row'}>
        {/* //////// Sidebar  */}
        <Box
          sx={{
            position: { xs: 'fixed', md: 'relative' },
            width: { xs: '100%', md: '350px' },
            left: { xs: `${toggle ? '0' : '-100%'}`, md: '0%' },
            top: { xs: '0' },
            zIndex: { xs: '999', md: '0' },
            bottom: { xs: '0' },
            bgcolor: { xs: 'white', md: 'none' },
          }}
          // width={'350px'}
          height={'full'}
        >
          <Sidebar setToggle={setToggle} setItem={setItem} />
        </Box>

        <Box
          width={'100%'}
          minHeight={'82.5vh'}
          height={'auto'}
          bgcolor={'#f6f7ff'}
          p={'20px'}
        >
          <Box width={'90%'} margin={'auto'}>
            <Stack
              borderRadius={'4px'}
              direction={'row'}
              sx={{
                width: {
                  xs: '80%',
                  sm: '96%',
                  md: '98%',
                  lg: '97%',
                  xl: '98%',
                },
              }}
              gap={'6px'}
              alignItems={'center'}
              bgcolor={'white'}
              p={'16px'}
            >
              <Box>{selector?.user?.username}</Box>
              <ChevronRightIcon />
              <Box color={'blue'}>{item}</Box>
            </Stack>
            <Stack
              direction={'row'}
              my={'20px'}
              alignItems={'center'}
              gap={'5px'}
            >
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' } }}
                variant="contained"
              >
                CREATE
              </Button>
              <Button
                sx={{ fontSize: { xs: '12px', sm: '13px', md: '14px' } }}
                variant="contained"
              >
                ADD FILTER
              </Button>
            </Stack>
            <Box width={'100%'}>
              {selector?.value?.length > 0 ? (
                <Table
                  deleteData={deleteData}
                  editCustomer={editCustomer}
                  data={selector.value}
                />
              ) : (
                <Typography>No Data Found</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
