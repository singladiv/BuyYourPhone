import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Appbar = () => {
  const appBarTitleStyle = {
    flexGrow: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: '2rem', // Adjust the font size as needed
    fontWeight: 'light bold', // Set the font weight to 'bold'
    fontFamily: 'Arial, sans-serif', // Change the font family to your desired font
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'pink' }}>
      <Toolbar>
        <Typography variant="h6" sx={appBarTitleStyle}>
          BuyYourPhone
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
