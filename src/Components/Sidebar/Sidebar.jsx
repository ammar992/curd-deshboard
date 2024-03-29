import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { meunData } from '../../utills/Data/MenuItem/MenuItem';

const Sidebar = ({ setItem, setToggle }) => {
  const [menu, setMenu] = useState('Home');
  return (
    <Box>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <Box
          onClick={() => {
            setToggle(false);
            document.querySelector("body").style.overflow = "auto"
          }}
          padding={'10px'}
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: { xs: 'flex-end' },
          }}
        >
          <CloseIcon />
        </Box>
        {meunData.length > 0 &&
          meunData.map((item) => {
            return (
              <ListItem
                sx={{ bgcolor: item.name === menu ? '#f3f4fe' : '' }}
                onClick={() => {
                  setMenu(item.name);
                  setItem(item.name);
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default Sidebar;
