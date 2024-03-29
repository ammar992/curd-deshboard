import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Hidden, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar({ item, setToggle }) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const selector = useSelector((state) => state);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {item}
          </Typography>
          <Stack direction="row" alignItems={'center'} spacing={1}>
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <SearchIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer', display: { xs: 'none', md: 'block' } }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Avatar sx={{ backgroundColor: '#ddd' }}>A</Avatar>
            </Box>
            <Box
              onClick={() => {
                setToggle(true);
                document.querySelector("body").style.overflow = "hidden";
              }}
              sx={{ display: { xs: 'block', md: 'none' }, cursor: 'pointer' }}
            >
              <MenuIcon />
            </Box>
            <Typography
              sx={{ fontSize: '13px', display: { xs: 'none', md: 'block' } }}
            >
              Hi,{selector?.user?.username}
            </Typography>
          </Stack>
        </Toolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem sx={{ color: 'black' }} onClick={handleClose}>
            Profile
          </MenuItem>
          <MenuItem sx={{ color: 'black' }} onClick={handleClose}>
            My account
          </MenuItem>
          <Link style={{ textDecoration: 'none' }} to="/signin">
            <MenuItem sx={{ color: 'black' }} onClick={handleClose}>
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </AppBar>
    </Box>
  );
}
