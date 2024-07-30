import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" component={Link} to="/questions">
          Sorular
        </Button>
        <Button color="inherit" component={Link} to="/sent-tests">
          Gönderilmiş Testler
        </Button>
        <Button color="inherit" component={Link} to="/completed-tests">
          Tamamlanmış Testler
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;