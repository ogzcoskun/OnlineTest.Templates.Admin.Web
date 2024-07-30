import React from 'react';
import { Container, Typography } from '@mui/material';

const CompletedTests = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Tamamlanmış Testler
      </Typography>
      <Typography variant="body1">
        Tamamlanmış testler burada listelenecek.
      </Typography>
    </Container>
  );
};

export default CompletedTests;