import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => (
  <AppBar position="static" sx={{ backgroundColor: '#d4763b', height: '150px', justifyContent: 'center', boxShadow: 'none', borderRadius: '8px 8px 0 0' }}>
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src="logo.png" alt="Company Logo" style={{ width: '150px', marginRight: '15px' }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2rem', textAlign: 'center' }}>
          ICICI Lombard - KPI Dashboard
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
