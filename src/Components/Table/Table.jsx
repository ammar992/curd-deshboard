import React from 'react';
import {
  Box,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';

const Tables = ({ data, deleteData, editCustomer }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '5px', overflowX: 'auto' }}>
      <Box sx={{ padding: '12px', borderBottom: '2px solid black' }}>
        <Typography>Filter</Typography>
      </Box>
      <Table sx={{ overflowY: isSmallScreen ? 'auto' : 'visible' }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {item?.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    {item?.description}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: isSmallScreen ? '5px' : '10px',
                      }}
                    >
                      <Button
                        onClick={() => {
                          editCustomer(item);
                        }}
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => {
                          deleteData(item.name);
                        }}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Tables;
